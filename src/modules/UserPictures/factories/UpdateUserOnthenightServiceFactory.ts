import UserRepository from '@Modules/User/Repository/typeorm/UserRepository';
import { FileUploader } from '@Utils/FileUploader';
import { RandonByteaGenerator } from '@Utils/RandonBytesGenerator';

import UpdateUserOnthenightService from '../Services/UpdateUserOnthenightService';

export default function UpdateUserOnthenightServiceFactoryts(): UpdateUserOnthenightService {
  const userRepository = new UserRepository();
  const randonBytesGenerator = new RandonByteaGenerator();
  const fileUploader = new FileUploader();
  const updateUserService = new UpdateUserOnthenightService(
    randonBytesGenerator,
    userRepository,
    fileUploader,
  );
  return updateUserService;
}
