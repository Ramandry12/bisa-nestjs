import {
  ConflictException,
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { ProductStatus } from './product-status.enum';
import { CreateProductDto } from './dto/create-product.dto';
import { GetProductFilterDto } from './dto/get-products-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './products.entity';
import { Repository } from 'typeorm';
// import * as fs from 'fs';
// import * as util from 'util';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
  ) {}

  // private async ImageToBase64(filePath: string): Promise<string> {
  //   const readFile = util.promisify(fs.readFile);

  //   try {
  //     // Read the image file asynchronously
  //     const imageData = await readFile(filePath);

  //     // Convert the image data to base64 string
  //     const base64String = imageData.toString('base64');

  //     return base64String;
  //   } catch (error) {
  //     // Handle any errors that occur during the process
  //     throw new Error(`Failed to read image file: ${error.message}`);
  //   }
  // }

  async getProducts(filterDto: GetProductFilterDto): Promise<Product[]> {
    const query = this.productRepository.createQueryBuilder('product');
    const { status, search } = filterDto;

    if (status) {
      query.andWhere('product.status = :status', { status });
    } else if (search) {
      query.andWhere(
        'LOWER(product.idProduct) LIKE LOWER(:search) OR LOWER(product.productName) LIKE LOWER(:search) OR LOWER(product.description) LIKE LOWER(:search)',
        { search: `%${search}%` },
      );
    }

    const product = await query.getMany();

    if (!product.length) {
      throw new NotFoundException('No products found');
    }
    const rating = product.map((value) => {
      value.rating =
        typeof value.rating === 'string'
          ? JSON.parse(value.rating)
          : value.rating;

      return value;
    });
    return rating;
  }

  async getProductById(id: string): Promise<Product> {
    const found = await this.productRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
    return found;
  }

  async createProduct(
    createProductDto: CreateProductDto,
    // imageFile: Express.Multer.File,
  ): Promise<Product> {
    const { idProduct, productName, description, price, category, rating } =
      createProductDto;
    // const base64Image = await this.ImageToBase64(imageFile.path);

    // const productWithSameId = await this.productRepository.findOne({
    //   where: { idProduct },
    // });

    // if (productWithSameId) {
    //   throw new UnprocessableEntityException(
    //     `Product with idProduct "${idProduct}" already exists`,
    //   );
    // }

    const product: Product = this.productRepository.create({
      idProduct,
      productName,
      description,
      price,
      category,
      // image: base64Image,
      rating,
      status: ProductStatus.TERSEDIA,
    });

    try {
      await this.productRepository.save(product);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          `Product with idProduct ${idProduct} already exists`,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }
    return product;
  }

  async updateProduct(
    id: string,
    updateProductDto: CreateProductDto,
    // imageFile: Express.Multer.File,
  ): Promise<Product> {
    const existingProduct = await this.getProductById(id);

    const { idProduct, productName, description, price, category, rating } =
      updateProductDto;
    // const base64Image = await this.ImageToBase64(imageFile.path);

    if (idProduct.length > 8) {
      throw new HttpException(
        'idProduct should have a maximum length of 8 characters',
        HttpStatus.PAYLOAD_TOO_LARGE,
      );
    }

    // const productWithSameId = await this.productRepository.findOne({
    //   where: { idProduct },
    // });
    // if (productWithSameId) {
    //   throw new UnprocessableEntityException(
    //     `Product with idProduct "${idProduct}" already exists`,
    //   );
    // }

    existingProduct.idProduct = idProduct;
    existingProduct.productName = productName;
    existingProduct.description = description;
    existingProduct.price = price;
    existingProduct.category = category;
    existingProduct.rating = rating;
    // existingProduct.image = base64Image;

    // await this.productRepository.save(existingProduct);

    try {
      await this.productRepository.save(existingProduct);
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException(
          `Product with idProduct ${idProduct} already exists`,
        );
      } else {
        throw new InternalServerErrorException();
      }
    }

    return existingProduct;
  }

  async deleteProduct(id: string): Promise<void> {
    const result = await this.productRepository.delete({ id });

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }
  }
  async updateProductStatus(
    id: string,
    status: ProductStatus,
  ): Promise<Product> {
    const products = await this.getProductById(id);
    products.status = status;

    await this.productRepository.save(products);
    return products;
  }
}
