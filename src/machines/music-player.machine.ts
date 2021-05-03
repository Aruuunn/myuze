import {
  assign, interpret, Machine, send,
} from 'xstate';
import { MusicDataInterface } from '../interfaces';
import { AudioAPI, MusicStorage } from '../services';

export interface MusicPlayerMachineContext {
  currentPlayingMusic: MusicDataInterface | null;
  index: number;
}

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
}

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
  },
  on: {
    [MusicPlayerMachineEvents.LOAD]: {
      target: LOADING,
    },
    [MusicPlayerMachineEvents.NEXT]: {
      actions: send((context) => ({
        type: MusicPlayerMachineEvents.LOAD,
        index: context.index + 1,
      })),
    },
    [MusicPlayerMachineEvents.PREV]: {
      actions: send((context) => ({
        type: MusicPlayerMachineEvents.LOAD,
        index: context.index - 1,
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
          let { index } = event;

          if (typeof index !== 'number') {
            return Promise.reject();
          }

          const total = await db.getTotalCount();

          if (index >= total) {
            index = 0;
          } else if (index < 0) {
            index = total - 1;
          }

          const { id } = (await db.getMusicAt(index)) ?? {};

          if (!id) {
            return Promise.reject();
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
            index: (_, event) => event.data?.index,
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

(window as any).musicPlayerService = musicPlayerService;
