import Dexie from 'dexie';
import { v1 as uuid } from 'uuid';
import { CacheInterface, MusicDataInterface, MusicStorageInterface } from '../interfaces';
import { Singleton, DispatchEvent, addEventListener } from '../decorators';
import { StorageCache } from './storage-cache';

function getNewMusicData(
  musicData: Omit<MusicDataInterface, 'id' | 'createdAt'>,
): MusicDataInterface {
  return {
    ...musicData,
    createdAt: new Date(),
    id: uuid(),
  };
}

const DATA_CHANGE_EVENT_NAME = 'music-storage-data-change';
const DispatchEventOnDataChange = DispatchEvent(DATA_CHANGE_EVENT_NAME);
const cache: CacheInterface = new StorageCache();
const CacheOutput = cache.getCacheDecorator();
const ClearCache = cache.getCacheClearDecorator();

@Singleton
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

  @ClearCache
  @DispatchEventOnDataChange
  async addNewMusic(
    musicData: Omit<MusicDataInterface, 'id' | 'createdAt'>,
  ): Promise<void> {
    await this.songs.add(getNewMusicData(musicData));
  }

  @ClearCache
  @DispatchEventOnDataChange
  async addBulkNewMusic(
    musicData: Omit<MusicDataInterface, 'id' | 'createdAt'>[],
  ): Promise<void> {
    await this.songs.bulkAdd(musicData.map((data) => getNewMusicData(data)));
  }

  @CacheOutput
  async getMusicAt(
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

  @CacheOutput
  async getMusicUsingId(id: string): Promise<MusicDataInterface | undefined> {
    return (await this.songs.where('id').equals(id).limit(1).toArray())[0];
  }

  @ClearCache
  @DispatchEventOnDataChange
  async deleteMusicUsingId(id: number): Promise<void> {
    await this.songs.where('id').equals(id).delete();
  }

  // eslint-disable-next-line class-methods-use-this
  onChange(callback: () => void): void {
    addEventListener(DATA_CHANGE_EVENT_NAME, () => {
      callback();
    });
  }
}
