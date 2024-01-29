import { IsJSON, IsNotEmpty, IsNumberString, IsString } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  idProduct: string;

  @IsNotEmpty()
  @IsString()
  productName: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsNumberString()
  price: number;

  @IsNotEmpty()
  @IsString()
  category: string;

  @IsJSON()
  rating?: {
    rate: number;
    count: number;
  };

  image: string;
}
