import { useContext } from 'react';
import { useService } from '@xstate/react';
import {
  EventObject, Interpreter, PayloadSender, State,
} from 'xstate';
import { MusicPlayerInterpreterContext } from '../providers';
import { MusicPlayerMachineContext } from '../machines';

export function useMusicPlayerMachine():
[
  State<MusicPlayerMachineContext>,
  PayloadSender<EventObject & { [key:string]: any }>,
  Interpreter<MusicPlayerMachineContext>,
] {
  const service = useContext(MusicPlayerInterpreterContext);
  const [current, send] = useService(service);

  return [current, send, service];
}
