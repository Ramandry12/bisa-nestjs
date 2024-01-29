import { IsEnum, IsOptional, IsString } from 'class-validator';
import { ProductStatus } from '../product-status.enum';

export class GetProductFilterDto {
  @IsOptional()
  @IsEnum(ProductStatus)
  status?: ProductStatus;
  @IsOptional()
  @IsString()
  search?: string;
}
