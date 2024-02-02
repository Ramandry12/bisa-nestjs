import { Matches, MaxLength, MinLength } from 'class-validator';

export class CreateUserAuthDto {
  @MinLength(8)
  @MaxLength(20)
  username: string;

  @MinLength(8)
  @MaxLength(100)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password is to weak',
  })
  password: string;
}
