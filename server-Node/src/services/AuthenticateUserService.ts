import { compare } from 'bcryptjs';
import { getCustomRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import { UsersRepositories } from '../repositories/UsersRepositories';

interface IAuthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {

  async execute({ email, password }: IAuthenticateRequest) {

    const usersRepositories = getCustomRepository(UsersRepositories);

    const user = await usersRepositories.findOne({
      email
    });

    if(!user) {
      throw new Error('Email/Password incorrect');
    }

    const passwordMatch = await compare(password, user.password);
    
    if(!passwordMatch) {
      throw new Error('Email/Password incorrect');
    }

    const token = sign({
      email: user.email,  
    }, 'c3c8b3c1a1e86cbc39236aa7d1395382', {
      subject: user.id,
      expiresIn: '1d'
    });

    return token;

  }

}

export { AuthenticateUserService }