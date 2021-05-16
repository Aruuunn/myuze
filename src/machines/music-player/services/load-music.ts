import { AnyEventObject } from 'xstate';
import { isTruthy } from '../../../utils';
import { notify } from '../../../common/notify';
import { MusicPlayerMachineContext as Context } from '../context.interface';
import { getAudiService, getMusicStorage } from '../../../services';

const audioService = getAudiService();
const db = getMusicStorage();

export async function loadMusic(_: Context, event: AnyEventObject) {
  let { index, id } = event;

  if (typeof index !== 'number' && typeof id !== 'string') {
    return Promise.reject();
  }

  if (!isTruthy<string>(id)) {
    const total = await db.getTotalCount();
    if (index >= total) {
      index %= total;
    } else if (index < 0) {
      index = total - 1;
    }
    id = (await db.getMusicAt(index))?.id ?? null;

    if (!isTruthy<string>(id)) {
      return Promise.reject();
    }
  }

  const musicData = await db.getMusicUsingId(id);

  if (musicData) {
    return audioService
      .load(musicData.musicDataURL)
      .then(() => {
        notify(musicData.title,
          {
            image: musicData.imgURL,
            silent: true,
            requireInteraction: false,
          });
        return ({ ...musicData, index });
      });
  }

  return Promise.reject();
}
