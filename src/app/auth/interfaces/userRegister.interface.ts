import { UserLogin } from './userLogin.interface';

export interface UserRegister extends UserLogin {
  email: string;
  name: string;
}
