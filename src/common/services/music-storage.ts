import Dexie from 'dexie';
import { v1 as uuid } from 'uuid';
import { MusicDataInterface, MusicStorageInterface } from '../../interfaces';

function getNewMusicData(
  musicData: Omit<MusicDataInterface, 'id' | 'createdAt'>,
): MusicDataInterface {
  return {
    ...musicData,
    createdAt: new Date(),
    id: uuid(),
  };
}

export class MusicStorage extends Dexie implements MusicStorageInterface {
  private songs: Dexie.Table<MusicDataInterface, number>;

  constructor() {
    super('MusicDatabase');
    this.version(1).stores({
      songs: '++id, imgURL, artists, createdAt, title, musicDataURL',
    });
    this.songs = this.table('songs');
  }

  getTotalCount(): Promise<number> {
    return this.songs.count();
  }

  async addNewMusic(
    musicData: Omit<MusicDataInterface, 'id' | 'createdAt'>,
  ): Promise<void> {
    await this.songs.add(getNewMusicData(musicData));
  }

  async addBulkNewMusic(
    musicData: Omit<MusicDataInterface, 'id' | 'createdAt'>[],
  ): Promise<void> {
    await this.songs.bulkAdd(musicData.map((data) => getNewMusicData(data)));
  }

  getMusicAt(
    index: number,
    filter: (obj: MusicDataInterface) => boolean = () => true,
  ): Promise<MusicDataInterface | undefined> {
    return this.songs
      .orderBy('createdAt')
      .filter(filter)
      .reverse()
      .offset(index)
      .first();
  }

  async getMusicUsingId(id: string): Promise<MusicDataInterface | undefined> {
    console.log(`fetching ${id}`);
    return (await this.songs.where('id').equals(id).limit(1).toArray())[0];
  }

  async deleteMusicUsingId(id: number): Promise<void> {
    await this.songs.where('id').equals(id).delete();
  }
}
