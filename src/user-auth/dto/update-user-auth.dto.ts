import { MaxLength, MinLength } from 'class-validator';

export class UpdateUserAuthDto {
  @MinLength(8)
  @MaxLength(20)
  username: string;
}
