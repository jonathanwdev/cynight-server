import { NotFoundError, ServerError } from '@Helpers/AppoloError';
import { IUserRepository } from '@Modules/User/Repository/usecases/IUserRepository';
import User from '@Typeorm/entity/User';
import { IFileUploader } from '@Utils/usecases/IFileUploader';
import { IRandonbytesGenerator } from '@Utils/usecases/IRandonBytesGenerator';
import fs from 'fs';
import { join } from 'path';

import { updateUserAvatarData } from '../Repository/usecases/IUserPicturesRepository';

class UpdateUserAvatarService {
  constructor(
    private readonly randonBytesGenerator: IRandonbytesGenerator,
    private readonly userRepository: IUserRepository,
    private readonly fileUploader: IFileUploader,
  ) {}

  public async run({ files, userId }: updateUserAvatarData): Promise<User> {
    try {
      const userExist = await this.userRepository.findOneUserByEmailOrIDorNick({
        id: userId,
      });

      if (!userExist) {
        throw new ServerError('User does not exist !');
      }
      const generatedBytes = this.randonBytesGenerator.generateRandonBytes();

      const avatarUploaded = await this.fileUploader.uploadFile({
        file: files,
        fileNameToConcat: generatedBytes,
        local: 'avatars',
        acceptedExt: 'image/jpeg' || 'image/png',
      });

      if (userExist.avatar) {
        try {
          const path = join(
            __dirname,
            `/../../../../tmp/avatars/${userExist.avatar}`,
          );
          const avatarExist = await fs.promises.stat(path);
          if (avatarExist) {
            await fs.promises.unlink(path);
          }
        } catch (err) {
          const path = join(
            __dirname,
            `/../../../../tmp/avatars/${avatarUploaded.filename}`,
          );
          const avatarExist = await fs.promises.stat(path);
          if (avatarExist) {
            await fs.promises.unlink(path);
          }
          throw new NotFoundError('Wrong directory of file');
        }
      }
      userExist.avatar = avatarUploaded.filename;

      const user = await this.userRepository.save(userExist);

      return user;
    } catch (err) {
      throw new ServerError(err);
    }
  }
}

export default UpdateUserAvatarService;
