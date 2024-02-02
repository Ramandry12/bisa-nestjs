import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { CreateUserAuthDto } from './dto/create-user-auth.dto';
import { UpdateUserAuthDto } from './dto/update-user-auth.dto';
import { UserAuth } from './entities/user-auth.entity';

@Controller('api/auth')
export class UserAuthController {
  constructor(private userAuthService: UserAuthService) {}

  @Post('/signup')
  signUp(@Body() createUserAuthDto: CreateUserAuthDto): Promise<UserAuth> {
    return this.userAuthService.signUp(createUserAuthDto);
  }

  @Get()
  findAll() {
    return this.userAuthService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userAuthService.findOne(+id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateUserAuthDto: UpdateUserAuthDto,
  // ) {
  //   return this.userAuthService.update(+id, updateUserAuthDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userAuthService.remove(+id);
  }
}
