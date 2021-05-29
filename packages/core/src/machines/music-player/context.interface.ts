import {MusicDataInterface} from "../../interfaces";
import {MusicPlayerModes} from "./modes.enum";

export interface MusicPlayerMachineContext {
    currentPlayingMusic: MusicDataInterface | null;
    index: number;
    mode: MusicPlayerModes;
}
