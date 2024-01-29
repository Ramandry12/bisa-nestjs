import { IsEnum } from 'class-validator';
import { ProductStatus } from '../product-status.enum';

export class UpdateProductStatusDto {
  @IsEnum(ProductStatus)
  status: ProductStatus;
}
