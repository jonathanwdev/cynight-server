import UserRepository from '@Modules/User/Repository/typeorm/UserRepository';
import { FileUploader } from '@Utils/FileUploader';
import { RandonByteaGenerator } from '@Utils/RandonBytesGenerator';

import UpdateUserAvatarService from '../Services/UpdateUserAvatarService';

export default function UpdateUserAvatarServiceFactory(): UpdateUserAvatarService {
  const userRepository = new UserRepository();
  const randonBytesGenerator = new RandonByteaGenerator();
  const fileUploader = new FileUploader();
  const updateUserService = new UpdateUserAvatarService(
    randonBytesGenerator,
    userRepository,
    fileUploader,
  );
  return updateUserService;
}
