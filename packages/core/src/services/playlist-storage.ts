import Dexie from 'dexie';
import { v1 as uuid } from 'uuid';
import { PlaylistStorageInterface } from '../interfaces/playlist-storage';
import { PlaylistInterface } from '../interfaces/playlist.interface';
import { PlaylistMusicInterface } from '../interfaces/playlist-music.interface';
import { Singleton } from '../decorators';

@Singleton
export class PlaylistStorage extends Dexie implements PlaylistStorageInterface {
  private playlist: Dexie.Table<PlaylistInterface, string>;
  private playlistMusic: Dexie.Table<PlaylistMusicInterface, string>;

  constructor() {
    super('Playlist');
    this.version(1).stores({
      playlist: 'id, &name',
      playlistMusic: ',playlistId, musicId, order',
    });
    this.playlist = this.table('playlist');
    this.playlistMusic = this.table('playlistMusic');
  }

  async addNewPlaylist(playlistName: string): Promise<void> {
    await this.playlist.add({
      name: playlistName,
      id: uuid(),
      createdAt: new Date(),
    });
  }

  async deletePlaylist(playlistId: string): Promise<void> {
    await this.playlist.where('id').equals(playlistId).delete();
    await this.playlistMusic.where('playlistId').equals(playlistId).delete();
  }

  getPlaylistAt(index: number): Promise<PlaylistInterface | undefined> {
    return this.playlist.orderBy('createdAt').offset(index).first();
  }

  getPlaylistUsingId(
    playlistId: string,
  ): Promise<PlaylistInterface | undefined> {
    return this.playlist.where('id').equals(playlistId).first();
  }

  async addMusic(playlistId: string, musicId: string): Promise<void> {
    await this.playlistMusic.add({ musicId, playlistId, order: Date.now() });
  }

  async removeMusic(playlistId: string, musicId: string): Promise<void> {
    await this.playlistMusic
      .where('playlistId')
      .equals(playlistId)
      .and((playlistMusic) => playlistMusic.musicId === musicId)
      .delete();
  }

  getMusicAt(
    playlistId: string,
    index: number,
  ): Promise<PlaylistMusicInterface | undefined> {
    return this.playlistMusic
      .orderBy('order')
      .filter((playlistMusic) => playlistMusic.playlistId === playlistId)
      .offset(index)
      .first();
  }
}
