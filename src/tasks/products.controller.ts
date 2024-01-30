import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { ProductService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductFilterDto } from './dto/get-products-filter.dto';
import { UpdateProductStatusDto } from './dto/update-products-status.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Product } from './products.entity';

@Controller('/api/product')
export class ProductsController {
  constructor(private productServise: ProductService) {}

  @Get()
  getProducts(@Query() filterDto: GetProductFilterDto): Promise<Product[]> {
    return this.productServise.getProducts(filterDto);
  }

  @Get('/:id')
  getProductById(@Param('id') id: string): Promise<Product> {
    return this.productServise.getProductById(id);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  createProduct(
    // @UploadedFile(
    //   new ParseFilePipeBuilder()
    //     .addFileTypeValidator({
    //       fileType: 'jpeg',
    //     })
    //     .build(),
    // )
    // imageFile: Express.Multer.File,
    @Body() createProductDto: CreateProductDto,
  ) {
    const createdProduct = this.productServise.createProduct(
      createProductDto,
      // imageFile,
    );
    return createdProduct;
  }

  @Put('/:id')
  @UseInterceptors(FileInterceptor('image'))
  async updateProduct(
    @Param('id') productId: string,
    @Body() updateProductDto: CreateProductDto,
    // @UploadedFile() imageFile: Express.Multer.File,
  ): Promise<Product> {
    return this.productServise.updateProduct(
      productId,
      updateProductDto,
      // imageFile,
    );
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string): Promise<void> {
    return this.productServise.deleteProduct(id);
  }

  @Patch('/:id/status')
  updateProductStaus(
    @Param('id') id: string,
    @Body() updateProductStatusDto: UpdateProductStatusDto,
  ): Promise<Product> {
    const { status } = updateProductStatusDto;
    console.log(status);
    return this.productServise.updateProductStatus(id, status);
  }
}
