import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ProductStatus } from './product-status.enum';

@Entity()
export class Product {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true, length: 8 })
  idProduct: string;

  @Column()
  productName: string;

  @Column()
  description: string;

  @Column()
  price: number;

  @Column()
  category: string;

  // @Column()
  // image: string;

  @Column()
  status: ProductStatus;

  @Column({ type: 'json', nullable: true })
  rating: {
    rate: number;
    count: number;
  };
}
