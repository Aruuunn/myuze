import { parseBlob, selectCover } from 'music-metadata-browser';
import { MusicDataInterface, MusicStorageInterface } from '../interfaces';
import { fileToBase64, getMimeType, uintToBase64Image } from '../utils';

export async function OnMusicUpload(
  db: MusicStorageInterface,
  files: File[],
): Promise<void> {
  const musicData: Omit<MusicDataInterface, 'id' | 'createdAt'>[] = [];
  const audioEl = new Audio();

  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    try {
      // eslint-disable-next-line no-await-in-loop
      const metaData = await parseBlob(file);

      const {
        common: { artists, title, picture },
      } = metaData;

      let pictureBase64: string | undefined;
      const selectedPicture = selectCover(picture);

      if (picture && selectedPicture) {
        pictureBase64 = uintToBase64Image(
          selectedPicture.format,
          selectedPicture.data,
        );
      }
      // eslint-disable-next-line no-await-in-loop
      const musicDataURL:string = await fileToBase64(file);
      const mimeType = getMimeType(musicDataURL);

      if (!audioEl.canPlayType(mimeType)) {
        alert(`${file.name} is not supported by the browser!`);
        // eslint-disable-next-line no-continue
        continue;
      }

      musicData.push({
        artists: artists ?? [],
        imgURL: pictureBase64,
        title: title ?? files[0].name,
        musicDataURL,
      });
    } catch (e) {
      alert(`${file.name} is not playable!`);
    }
  }
  await db.addBulkNewMusic(musicData);
}
