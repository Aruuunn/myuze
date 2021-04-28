import { parseBlob, selectCover } from 'music-metadata-browser';
import { MusicDataInterface, MusicStorageInterface } from '../interfaces';
import { fileToBase64, uintToBase64Image } from '../../utils';

export async function OnMusicUpload(db: MusicStorageInterface, files: File[]): Promise<void> {
  const musicData: Omit<MusicDataInterface, 'id' | 'createdAt'>[] = [];

  // eslint-disable-next-line no-restricted-syntax
  for (const file of files) {
    // eslint-disable-next-line no-await-in-loop
    const metaData = await parseBlob(file);

    const {
      common: {
        artists, title, picture,
      },
    } = metaData;

    let pictureBase64: string | undefined;
    const selectedPicture = selectCover(picture);

    if (picture && selectedPicture) {
      pictureBase64 = (uintToBase64Image(selectedPicture.format, selectedPicture.data));
    }

    musicData.push({
      artists: artists ?? [],
      imgURL: pictureBase64,
      title: title ?? files[0].name,
      // eslint-disable-next-line no-await-in-loop
      musicDataURL: (await fileToBase64(file)) as string,
    });
  }
  await db.addBulkNewMusic(musicData);
}
