import UserRepository from '../Repository/typeorm/UserRepository';
import DeleteUserService from '../Services/DeleteUserService';

export default function DeleteUserServiceFactory(): DeleteUserService {
  const userRepository = new UserRepository();
  const deleteUserService = new DeleteUserService(userRepository);
  return deleteUserService;
}
