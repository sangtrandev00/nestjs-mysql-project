import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { Product } from 'src/products/product.entity';
import { Order } from 'src/orders/order.entity';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'integer', width: 11, nullable: false })
  productQty: number;

  @Column({ type: 'float', nullable: false })
  price: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  productName: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  thumbnail: string;

  // reference to product
  @OneToOne(() => Product, (product) => product.orderDetail)
  product: Product;

  @OneToOne(() => Order, (order) => order.orderDetail)
  order: Order;
}
