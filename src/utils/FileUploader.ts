/* eslint-disable prefer-promise-reject-errors */
import { ServerError } from '@Helpers/AppoloError';
import { createWriteStream } from 'fs';
import { join } from 'path';

import {
  fileUploaderData,
  IFileUploader,
  FileUploaderResponse,
} from './usecases/IFileUploader';

export class FileUploader implements IFileUploader {
  public async uploadFile({
    acceptedExt = 'image/*',
    file,
    fileNameToConcat,
    local,
  }: fileUploaderData): Promise<FileUploaderResponse> {
    const { createReadStream, filename, mimetype } = file;
    if (acceptedExt !== 'image/*') {
      if (mimetype !== acceptedExt) {
        throw new ServerError('Wrong file format');
      }
    }

    const newFileName = `${fileNameToConcat}-${filename}`.replace(/ /g, '');

    const stream = createReadStream();
    const path = join(__dirname, `/../../tmp/${local}/${newFileName}`);
    const pipe = await stream.pipe(createWriteStream(path));

    return new Promise((resolve, reject) =>
      pipe
        .on('finish', () =>
          resolve({
            filename: newFileName,
            fileformat: mimetype,
            success: true,
          }),
        )
        .on('error', () => reject(new ServerError('Error on saving file'))),
    );
  }
}
