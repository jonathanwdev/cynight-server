import { Stream } from 'stream';

export type FileUpload = {
  filename: string;
  mimetype: string;
  encoding: string;
  createReadStream(): Stream;
};

export type updateUserAvatarData = {
  files: FileUpload;
  userId: string;
};
