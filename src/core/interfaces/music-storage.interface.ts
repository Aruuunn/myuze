import { MusicDataInterface } from './music-data.interface';

export interface MusicStorageInterface {
  getTotalCount(): Promise<number>;

  /**
   *  Should return music data which will be present at a given index at the,
   *  return order of all Music Data.
   *  This will be used to virtualize list
   * */
  getMusicAt(index: number): Promise<MusicDataInterface | undefined>;

  getMusicUsingId(id: number): Promise<MusicDataInterface | undefined>;

  addNewMusic(musicData: Omit<MusicDataInterface, 'id' | 'createdAt'>): Promise<void>;

  addBulkNewMusic(musicData: Omit<MusicDataInterface, 'id' | 'createdAt'>[]): Promise<void>;

  deleteMusicUsingId(id: number): Promise<void>;
}
