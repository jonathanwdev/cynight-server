import { FileUpload } from '@Modules/UserPictures/Repository/usecases/IUserPicturesRepository';

export type FileUploaderResponse = {
  filename: string;
  fileformat: string;
  success: boolean;
};

export type fileUploaderData = {
  fileNameToConcat: string;
  acceptedExt?:
    | 'image/jpeg'
    | 'image/png'
    | 'image/gif'
    | 'image/webp'
    | 'image/bmp'
    | 'image/*';
  file: FileUpload;
  local: 'avatars' | 'onthenight';
};

export interface IFileUploader {
  uploadFile: (data: fileUploaderData) => Promise<FileUploaderResponse>;
}
