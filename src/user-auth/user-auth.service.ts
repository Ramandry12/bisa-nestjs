import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserAuthDto } from './dto/create-user-auth.dto';
import { UpdateUserAuthDto } from './dto/update-user-auth.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserAuth } from './entities/user-auth.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserAuthService {
  constructor(
    @InjectRepository(UserAuth)
    private userAuthRepository: Repository<UserAuth>,
  ) {}

  async signUp(createUserAuthDto: CreateUserAuthDto): Promise<UserAuth> {
    const { username, password } = createUserAuthDto;
    const user: UserAuth = this.userAuthRepository.create({
      username,
      password,
    });

    try {
      await this.userAuthRepository.save(user);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('username already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    return user;
  }

  findAll() {
    return `This action returns all userAuth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} userAuth`;
  }

  // update(id: number, updateUserAuthDto: UpdateUserAuthDto) {
  //   return `This action updates a #${id} userAuth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} userAuth`;
  }
}
