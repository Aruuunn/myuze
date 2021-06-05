import { PlaylistInterface } from './playlist.interface';
import { PlaylistMusicInterface } from './playlist-music.interface';

export interface PlaylistStorageInterface {
  /* similar to getMusicAt in music-storage interface */
  getPlaylistAt(index: number): Promise<PlaylistInterface | undefined>;

  getPlaylistUsingId(
    playlistId: string,
  ): Promise<PlaylistInterface | undefined>;

  addNewPlaylist(playlistName: string): Promise<void>;

  deletePlaylist(playlistId: string): Promise<void>;

  addMusic(playlistId: string, musicId: string): Promise<void>;

  removeMusic(playlistId: string, musicId: string): Promise<void>;

  getMusicAt(
    playlistId: string,
    index: number,
  ): Promise<PlaylistMusicInterface | undefined>;

  getTotalCount(): Promise<number>;

  getMusicCount(playlistId: string): Promise<number>;

  /**
   * Accept callback to call whenever stored data is deleted/updated or new data is added
   * */
  onChange(callback: () => void): void;
}
