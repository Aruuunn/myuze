import {
  parseBlob,
  selectCover,
  IAudioMetadata,
  IPicture,
} from 'music-metadata-browser';
import { MusicDataInterface, MusicStorageInterface } from '../interfaces';
import {
  fileToBase64,
  getMimeType,
  uintToBase64Image,
  isNotNullable,
} from '../utils';
import { EitherAsync, Either, MaybeAsync, Maybe } from 'purify-ts';
import { isEmptyString } from '../utils/isEmptyString';

const audioEl = new Audio();

const alertUserOfNotPlayableMusic = (fileName: string) =>
  alert(`${fileName} is not supported by the browser!`);

const promiseToEitherAsync = <T>(
  promise: Promise<T>,
): EitherAsync<unknown, T> =>
  EitherAsync.fromPromise(() => promise.then((val) => Either.of(val)));

const getPicture = (picture?: IPicture[]) =>
  Maybe.fromNullable(picture)
    .map(selectCover)
    .filter(isNotNullable)
    .map((_) => uintToBase64Image(_.format, _.data))
    .extract();

type ExtractedMetaData = EitherAsync<
  unknown,
  Pick<MusicDataInterface, 'artists' | 'title' | 'imgURL'>
>;

const extractMetaData = (file: File): ExtractedMetaData =>
  EitherAsync(async () => file)
    .chain<unknown, IAudioMetadata>((_) => promiseToEitherAsync(parseBlob(_)))
    .map(({ common: { artists, title, picture } }) => ({
      artists,
      title,
      picture,
    }))
    .map(({ artists, picture, title }) => ({
      artists: artists?.filter(isEmptyString) || [],
      title: title || file.name,
      imgURL: getPicture(picture),
    }));

const canPlayMimeType = (mime: string) =>
  audioEl.canPlayType(mime).length !== 0;

const saveOneMusicFile = async (db: MusicStorageInterface, file: File) =>
  extractMetaData(file)
    .chain((metaData) =>
      fileToBase64(file).chain((musicDataURL) =>
        MaybeAsync(async () => musicDataURL)
          .map(getMimeType)
          .filter(canPlayMimeType)
          .map(() => db.addNewMusic({ musicDataURL, ...metaData }))
          .toEitherAsync(null),
      ),
    )
    .ifLeft(() => alertUserOfNotPlayableMusic(file.name))
    .run();

export const saveMusic = async (
  db: MusicStorageInterface,
  files: File[],
): Promise<void> => void files.map((file) => saveOneMusicFile(db, file));
