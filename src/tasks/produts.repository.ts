// import { Injectable } from '@nestjs/common';
// import { DataSource, Repository } from 'typeorm';
// import { ProductStatus } from './product-status.enum';
// import { CreateProductDto } from './dto/create-product.dto';
// import { Product } from './products.entity';
// import * as fs from 'fs';
// import * as util from 'util';
// @Injectable()
// export class ProductRepository extends Repository<Product> {
//   constructor(private data: DataSource) {
//     super(Product, data.createEntityManager());
//   }

//   async imageToBase64(filePath: string): Promise<string> {
//     const readFile = util.promisify(fs.readFile);
//     try {
//       const imageData = await readFile(filePath);
//       const base64String = imageData.toString('base64');
//       return base64String;
//     } catch (error) {
//       throw new Error(`Failed to read image file: ${error.message}`);
//     }
//   }
//   async createProduct(
//     createProductDto: CreateProductDto,
//     imageFile: Express.Multer.File,
//   ): Promise<Product> {
//     const { productName, description, price, category } = createProductDto;
//     const base64Image = await this.imageToBase64(imageFile.path);

//     const product: Product = this.create({
//       productName,
//       description,
//       price,
//       category,
//       image: base64Image,
//       status: ProductStatus.TERSEDIA,
//     });
//     await this.save(product);
//     return product;
//   }
// }
