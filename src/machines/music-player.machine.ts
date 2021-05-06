import {
  assign, interpret, Machine, send,
} from 'xstate';
import { MusicDataInterface } from '../interfaces';
import { AudioAPI, MusicStorage } from '../services';
import { isTruthy } from '../utils';

export enum MusicPlayerMachineStates {
  NOT_LOADED = 'NOT_LOADED',
  LOADED = 'LOADED',
  PLAYING = 'PLAYING',
  PAUSED = 'PAUSED',
  LOADING = 'LOADING',
}

export enum MusicPlayerMachineEvents {
  LOAD = 'LOAD',
  PLAY = 'PLAY',
  PAUSE = 'PAUSE',
  NEXT = 'NEXT',
  PREV = 'PREV',
  CHANGE_MODE = 'CHANGE_MODE',
}

export enum MusicPlayerModes {
  NORMAL = 'NORMAL',
  SHUFFLE = 'SHUFFLE',
  ON_REPEAT = 'ON_REPEAT',
}

export interface MusicPlayerMachineContext {
  currentPlayingMusic: MusicDataInterface | null;
  index: number;
  mode: MusicPlayerModes;
}

const getRandom = (): number => Math.ceil(Math.random() * 1e6);

const {
  LOADED,
  PAUSED,
  PLAYING,
  NOT_LOADED,
  LOADING,
} = MusicPlayerMachineStates;

const db = new MusicStorage();
const audioService = new AudioAPI();

export const musicPlayerMachine = Machine<MusicPlayerMachineContext>({
  initial: NOT_LOADED,
  context: {
    currentPlayingMusic: null,
    index: -1,
    mode: MusicPlayerModes.NORMAL,
  },
  on: {
    [MusicPlayerMachineEvents.LOAD]: {
      target: LOADING,
    },
    [MusicPlayerMachineEvents.NEXT]: {
      actions: send((context) => ({
        type: MusicPlayerMachineEvents.LOAD,
        // eslint-disable-next-line no-nested-ternary
        index: context.mode === MusicPlayerModes.NORMAL
          ? context.index + 1 : context.mode === MusicPlayerModes.SHUFFLE
            ? getRandom() : context.index,
      })),
    },
    [MusicPlayerMachineEvents.PREV]: {
      actions: send((context) => ({
        type: MusicPlayerMachineEvents.LOAD,
        index: context.index - 1,
      })),
    },
    [MusicPlayerMachineEvents.CHANGE_MODE]: {
      actions: assign((context, event) => ({
        mode: event.mode in MusicPlayerModes ? event.mode : context.mode,
      })),
    },
  },
  states: {
    [NOT_LOADED]: {},
    [LOADED]: {
      on: {
        '': {
          target: PLAYING,
        },
      },
    },
    [PLAYING]: {
      invoke: {
        id: 'play-music',
        src: () => audioService.play(),
      },
      on: {
        [MusicPlayerMachineEvents.PAUSE]: {
          target: PAUSED,
        },
      },
    },
    [PAUSED]: {
      invoke: {
        id: 'pause-music',
        src: () => audioService.pause(),
      },
      on: {
        [MusicPlayerMachineEvents.PLAY]: {
          target: PLAYING,
        },
      },
    },
    [LOADING]: {
      invoke: {
        id: 'load-music',
        src: async (_, event) => {
          let { index, id } = event;

          if (typeof index !== 'number' && typeof id !== 'string') {
            return Promise.reject();
          }

          if (!isTruthy<string>(id)) {
            const total = await db.getTotalCount();
            if (index >= total) {
              index %= total;
            } else if (index < 0) {
              index = total - 1;
            }
            id = (await db.getMusicAt(index))?.id ?? null;

            if (!isTruthy<string>(id)) {
              return Promise.reject();
            }
          }

          const musicData = await db.getMusicUsingId(id);

          if (musicData) {
            return audioService
              .load(musicData.musicDataURL)
              .then(() => ({ ...musicData, index }));
          }

          return Promise.reject();
        },
        onDone: {
          target: LOADED,
          actions: assign({
            currentPlayingMusic: (_, event) => event.data,
            index: (context, event) => event.data?.index ?? context.index,
          }),
        },
        onError: {
          target: NOT_LOADED,
        },
      },
    },
  },
});

export const musicPlayerService = interpret(musicPlayerMachine).start();

audioService.onPause(() => {
  musicPlayerService.send({
    type: MusicPlayerMachineEvents.PAUSE,
  });
});

audioService.onPlay(() => {
  musicPlayerService.send({
    type: MusicPlayerMachineEvents.PLAY,
  });
});

audioService.onEnd(() => {
  musicPlayerService.send({
    type: MusicPlayerMachineEvents.NEXT,
  });
});
