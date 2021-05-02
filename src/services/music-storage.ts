import Dexie from 'dexie';
import { v1 as uuid } from 'uuid';
import { CacheInterface, MusicDataInterface, MusicStorageInterface } from '../interfaces';
import {
  Singleton, DispatchEvent, addEventListener, LogPerformance,
} from '../decorators';
import { StorageCache } from './storage-cache';

function getNewMusicData(
  musicData: Omit<MusicDataInterface, 'id' | 'createdAt'>,
) {
  const {
    imgURL, artists, title, musicDataURL,
  } = musicData;
  const albumCoverDataURLData = imgURL ? { id: uuid(), data: imgURL } : null;
  const musicDataURLData = { id: uuid(), data: musicDataURL };
  const songData = {
    id: uuid(),
    title,
    artists,
    musicDataURLDataId: musicDataURLData.id,
    albumCoverDataURLId: albumCoverDataURLData?.id ?? null,
    createdAt: new Date(),
  };

  return { songData, albumCoverDataURLData, musicDataURLData };
}

const DATA_CHANGE_EVENT_NAME = 'music-storage-data-change';
const DispatchEventOnDataChange = DispatchEvent(DATA_CHANGE_EVENT_NAME);
const cache: CacheInterface = new StorageCache();
const CacheOutput = StorageCache.getCacheDecorator(cache);
const ClearCache = StorageCache.getCacheClearDecorator(cache);

type Song = Omit<MusicDataInterface, 'musicDataURL' | 'imgURL'> & { musicDataURLDataId: string, albumCoverDataURLId: string | null };
type MusicDataURL = { data: string, id: string };
type AlbumCoverDataURL = { data: string, id: string };

@Singleton
export class MusicStorage extends Dexie implements MusicStorageInterface {
  private songs: Dexie.Table<Song, string>;

  private musicDataURLs: Dexie.Table<MusicDataURL, string>;

  private albumCoverDataURLs: Dexie.Table<AlbumCoverDataURL, string>;

  constructor() {
    super('MusicDatabase');
    this.version(1).stores({
      songs: 'id,createdAt,title',
      musicDataURLs: 'id',
      albumCoverDataURLs: 'id',
    });
    this.songs = this.table('songs');
    this.musicDataURLs = this.table('musicDataURLs');
    this.albumCoverDataURLs = this.table('albumCoverDataURLs');
  }

  @LogPerformance()
  @CacheOutput
  getTotalCount(): Promise<number> {
    return this.songs.count();
  }

  @DispatchEventOnDataChange
  @ClearCache
  async addNewMusic(
    musicData: Omit<MusicDataInterface, 'id' | 'createdAt'>,
  ): Promise<void> {
    const { albumCoverDataURLData, songData, musicDataURLData } = getNewMusicData(musicData);

    await Promise.all([
      this.songs.add(songData),
      this.musicDataURLs.add(musicDataURLData),
      albumCoverDataURLData ? this.albumCoverDataURLs.add(albumCoverDataURLData) : null,
    ]);
  }

  @LogPerformance('addBulkNewMusic')
  @DispatchEventOnDataChange
  @ClearCache
  async addBulkNewMusic(
    musicData: Omit<MusicDataInterface, 'id' | 'createdAt'>[],
  ): Promise<void> {
    const songs: Song[] = [];
    const albumCoverDataURLs: AlbumCoverDataURL[] = [];
    const musicDataURLs: MusicDataURL[] = [];

    musicData.map(getNewMusicData).forEach((data) => {
      const { musicDataURLData, songData, albumCoverDataURLData } = data;
      songs.push(songData);
      if (albumCoverDataURLData) albumCoverDataURLs.push(albumCoverDataURLData);
      musicDataURLs.push(musicDataURLData);
    });

    await Promise.all([
      this.songs.bulkAdd(songs),
      this.albumCoverDataURLs.bulkAdd(albumCoverDataURLs),
      this.musicDataURLs.bulkAdd(musicDataURLs),
    ]);
  }

  @LogPerformance('getMusicAt')
  @CacheOutput
  async getMusicAt(
    index: number,
    filter: (obj: Song) => boolean = () => true,
  ): Promise<Omit<MusicDataInterface, 'musicDataURL' | 'imgURL'> | undefined> {
    return this.songs
      .orderBy('createdAt').filter(filter).offset(index).reverse()
      .first();
  }

  @LogPerformance('getMusicUsingId')
  @CacheOutput
  async getMusicUsingId(id: string): Promise<MusicDataInterface | undefined> {
    const songData = await this.songs.where('id').equals(id).first();
    if (songData) {
      const { musicDataURLDataId, albumCoverDataURLId } = songData;
      const musicDataURLData = await this.musicDataURLs.where('id').equals(musicDataURLDataId).first();
      const albumCoverDataURLData = albumCoverDataURLId ? await this.albumCoverDataURLs.where('id').equals(albumCoverDataURLId).first() : null;

      if (!musicDataURLData) {
        return undefined;
      }

      return {
        ...songData,
        musicDataURL: musicDataURLData.data,
        imgURL: albumCoverDataURLData?.data,
      };
    }

    return undefined;
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
