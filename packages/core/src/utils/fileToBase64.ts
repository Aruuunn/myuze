import { EitherAsync } from 'purify-ts';

export const fileToBase64 = (file: File): EitherAsync<unknown, string> =>
  EitherAsync(() => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  });
