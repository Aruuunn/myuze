import { MusicDataInterface } from './music-data.interface';

export interface MusicStorageInterface {
  getTotalCount(): Promise<number>;

  /**
   *  Should return music data which will be present at a given index at the,
   *  return order of all Music Data.
   *  This will be used to virtualize list
   * */
  getMusicAt(
    index: number,
    filter?: (obj: MusicDataInterface) => boolean,
  ): Promise<Omit<MusicDataInterface, 'musicDataURL' | 'imgURL'> | undefined>;

  getMusicUsingId(id: string): Promise<MusicDataInterface | undefined>;

  addNewMusic(
    musicData: Omit<MusicDataInterface, 'id' | 'createdAt'>,
  ): Promise<void>;

  addBulkNewMusic(
    musicData: Omit<MusicDataInterface, 'id' | 'createdAt'>[],
  ): Promise<void>;

  deleteMusicUsingId(id: number): Promise<void>;

  /**
   * Accept callback to call whenever stored data is deleted/updated or new data is added
   * */
  onChange(callback: () => void): void;
}
