import UserRepository from '../Repository/typeorm/UserRepository';
import FindAllActiveUsersService from '../Services/FindAllActiveUsersService';

export default function FindAllActiveUsersServiceFactory(): FindAllActiveUsersService {
  const userRepository = new UserRepository();
  const findAllActiveUsers = new FindAllActiveUsersService(userRepository);
  return findAllActiveUsers;
}
