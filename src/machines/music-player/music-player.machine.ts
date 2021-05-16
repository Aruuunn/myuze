import {
  AnyEventObject,
  assign, Interpreter, Machine, MachineConfig, MachineOptions, send,
} from 'xstate';
import { MusicPlayerMachineEvents } from './events.enum';
import { MusicPlayerModes } from './modes.enum';
import { MusicPlayerMachineStates } from './states.enum';
import { MusicPlayerMachineContext as Context } from './context.interface';
import { getAudioService } from '../../services';

import { loadMusic } from './services';

const getRandom = (): number => Math.ceil(Math.random() * 1e6);

const {
  LOADED,
  PAUSED,
  PLAYING,
  NOT_LOADED,
  LOADING,
} = MusicPlayerMachineStates;

const audioService = getAudioService();

export const config: MachineConfig<Context, any, AnyEventObject> = {
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
      always: {
        target: PLAYING,
      },
    },
    [PLAYING]: {
      invoke: {
        id: 'play-music',
        src: 'playMusic',
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
        src: 'pauseMusic',
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
        src: 'loadMusic',
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
};

export const options: Partial<MachineOptions<Context, AnyEventObject>> = {
  services: {
    loadMusic,
    playMusic: () => audioService.play(),
    pauseMusic: () => audioService.pause(),
  },
};

export const musicPlayerMachine = Machine<Context, {}, AnyEventObject>(config, options);

export const addMusicPlayListeners = (
  musicPlayerService: Interpreter<Context>,
): void => {
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
};
