import UserRepository from '../Repository/typeorm/UserRepository';
import FindOneUserService from '../Services/FindOneUserService';

export default function FindOneUserServiceFactory(): FindOneUserService {
  const userRepository = new UserRepository();
  const findOneUserService = new FindOneUserService(userRepository);
  return findOneUserService;
}
