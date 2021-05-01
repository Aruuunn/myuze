import Dexie from 'dexie';
import { v1 as uuid } from 'uuid';
import { CacheInterface, MusicDataInterface, MusicStorageInterface } from '../interfaces';
import {
  Singleton, DispatchEvent, addEventListener, LogPerformance,
} from '../decorators';
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
const CacheOutput = StorageCache.getCacheDecorator(cache);
const ClearCache = StorageCache.getCacheClearDecorator(cache);

@Singleton
export class MusicStorage extends Dexie implements MusicStorageInterface {
  private songs: Dexie.Table<MusicDataInterface, number>;

  constructor() {
    super('MusicDatabase');
    this.version(1).stores({
      songs: 'id,createdAt,title',
    });
    this.songs = this.table('songs');
  }

  @LogPerformance
  getTotalCount(): Promise<number> {
    return this.songs.count();
  }

  @DispatchEventOnDataChange
  @ClearCache
  async addNewMusic(
    musicData: Omit<MusicDataInterface, 'id' | 'createdAt'>,
  ): Promise<void> {
    await this.songs.add(getNewMusicData(musicData));
  }

  @LogPerformance
  @DispatchEventOnDataChange
  @ClearCache
  async addBulkNewMusic(
    musicData: Omit<MusicDataInterface, 'id' | 'createdAt'>[],
  ): Promise<void> {
    await this.songs.bulkAdd(musicData.map((data) => getNewMusicData(data)));
  }

  @LogPerformance
  @CacheOutput
  async getMusicAt(
    index: number,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    filter: (obj: MusicDataInterface) => boolean = () => true,
  ): Promise<Omit<MusicDataInterface, 'musicDataURL' | 'imgURL'> | undefined> {
    const result: (Omit<MusicDataInterface, 'musicDataURL' | 'imgURL'> & { musicDataURL?: string, imgURL?: string }) | undefined = await this.songs
      .offset(index).reverse().first();

    if (typeof result !== 'undefined') {
      delete result.musicDataURL;
      delete result.imgURL;
      return result;
    }

    return result;
  }

  @LogPerformance
  @CacheOutput
  async getMusicUsingId(id: string): Promise<MusicDataInterface | undefined> {
    return (await this.songs.where('id').equals(id).limit(1).toArray())[0];
  }

  @DispatchEventOnDataChange
  @ClearCache
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
