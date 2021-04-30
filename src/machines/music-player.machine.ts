import {
  assign, Machine,
} from 'xstate';
import { MusicDataInterface } from '../interfaces';
import { AudioAPI, MusicStorage } from '../services';

export interface MusicPlayerMachineContext {
  currentPlayingMusic: MusicDataInterface | null;
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
  },
  on: {
    [MusicPlayerMachineEvents.LOAD]: {
      target: LOADING,
    },
  },
  states: {
    [NOT_LOADED]: {
    },
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
          const { id } = event;

          if (typeof id !== 'string') {
            return Promise.reject();
          }
          const musicData = await db.getMusicUsingId(id);

          if (musicData) {
            return audioService.load(musicData.musicDataURL).then(() => musicData);
          }
          return Promise.reject();
        },
        onDone: {
          target: LOADED,
          actions: assign({
            currentPlayingMusic: (_, event) => event.data,
          }),
        },
        onError: {
          target: NOT_LOADED,
        },
      },
    },
  },
});
