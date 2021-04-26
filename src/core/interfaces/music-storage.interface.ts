import { MusicDataInterface } from './music-data.interface';

export interface MusicStorageInterface {
  getTotalCount(): Promise<number>;
  getMusicAt(index: number): Promise<MusicDataInterface>;
  addNewMusic(musicData: MusicDataInterface): Promise<void>;
  deleteMusicAt(index: number): Promise<void>;
}
