import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from '../users/user.entity';
import { Category } from 'src/categories/category.entity';
import { OrderDetail } from 'src/orderdetails/orderdetails.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  // Còn những decorator nào quan trọng ???
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  name: string;

  @Column({ type: 'float', precision: 10, scale: 2, nullable: false })
  price: number;

  @Column({ type: 'integer', nullable: false, width: 11 })
  stockQty: number;

  @Column({ type: 'varchar', length: 255, nullable: false })
  images: string;

  @Column({ type: 'float', precision: 10, scale: 2, nullable: false })
  discount: number;

  @Column({ type: 'integer', nullable: false, width: 11 })
  views: number;

  @Column({ type: 'datetime', nullable: false, default: 'CURRENT_TIMESTAMP' })
  createdAt: string;

  @Column({ type: 'datetime', nullable: false, default: 'CURRENT_TIMESTAMP' })
  updatedAt: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  description: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  information: string;

  @OneToOne(() => Category, (category) => category.products)
  category: Category;

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.product)
  orderDetail: OrderDetail;

  @OneToOne(() => User, (user) => user.products)
  user: User;
}
