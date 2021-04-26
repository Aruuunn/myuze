import Dexie from 'dexie';
import { v1 as uuid } from 'uuid';
import { MusicDataInterface, MusicStorageInterface } from '../interfaces';

export class MusicStorage extends Dexie implements MusicStorageInterface {
  private songs: Dexie.Table<MusicDataInterface, number>;

  constructor() {
    super('MusicDatabase');
    this.version(1).stores({
      songs: '++id, imgURL, artists, createdAt, title',
    });
    this.songs = this.table('songs');
  }

  getTotalCount(): Promise<number> {
    return this.songs.count();
  }

  async addNewMusic(musicData: Omit<MusicDataInterface, 'id' | 'createdAt'>): Promise<void> {
    await this.songs
      .add({ ...musicData, createdAt: new Date(), id: uuid() });
  }

  getMusicAt(index: number): Promise<MusicDataInterface | undefined> {
    return this.songs.orderBy('createdAt').reverse().offset(index).first();
  }

  async getMusicUsingId(id: number): Promise<MusicDataInterface | undefined> {
    return (await this.songs.where('id').equals(id).limit(1).toArray())[0];
  }

  async deleteMusicUsingId(id: number): Promise<void> {
    await this.songs.where('id').equals(id).delete();
  }
}
