import { ServerError } from '@Helpers/AppoloError';
import { IUserRepository } from '@Modules/User/Repository/usecases/IUserRepository';
import User from '@Typeorm/entity/User';
import { IFileUploader } from '@Utils/usecases/IFileUploader';
import { IRandonbytesGenerator } from '@Utils/usecases/IRandonBytesGenerator';
import fs from 'fs';
import { join } from 'path';

import { updateUserAvatarData } from '../Repository/usecases/IUserPicturesRepository';

class UpdateUserOnthenightService {
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
        local: 'onthenight',
        acceptedExt: 'image/gif',
      });

      if (userExist.onTheNight) {
        try {
          const path = join(
            __dirname,
            `/../../../../tmp/onthenight/${userExist.onTheNight}`,
          );
          const avatarExist = await fs.promises.stat(path);
          if (avatarExist) {
            await fs.promises.unlink(path);
          }
        } catch (err) {
          const path = join(
            __dirname,
            `/../../../../tmp/onthenight/${avatarUploaded.filename}`,
          );
          const avatarExist = await fs.promises.stat(path);
          if (avatarExist) {
            await fs.promises.unlink(path);
          }
          throw new ServerError('Wrong directory of file');
        }
      }
      userExist.onTheNight = avatarUploaded.filename;

      const user = await this.userRepository.save(userExist);

      return user;
    } catch (err) {
      throw new ServerError(err);
    }
  }
}

export default UpdateUserOnthenightService;
