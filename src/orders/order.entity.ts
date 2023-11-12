import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  OneToOne,
} from 'typeorm';
import { Product } from 'src/products/product.entity';
import { OrderDetail } from 'src/orderdetails/orderdetails.entity';
import { User } from 'src/users/user.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  // Còn những decorator nào quan trọng ???
  @Column({ type: 'varchar', length: 50, nullable: false, unique: true })
  orderStringId: string;

  @Column({ type: 'integer', width: 11, nullable: false })
  totalAmount: number;

  @Column({ type: 'float', nullable: false })
  shippingFee: number;

  @Column({ type: 'float', nullable: false })
  vatFee: number;

  @Column({ type: 'varchar', length: 50, nullable: false })
  paymentMethod: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  fullName: string;

  @Column({ type: 'varchar', length: 20, nullable: false })
  phone: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  email: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  address: string;

  @Column({ type: 'varchar', length: 255, nullable: false })
  note: string;

  @Column({ type: 'datetime', nullable: false })
  createdAt: string;

  @Column({ type: 'varchar', length: 50, nullable: false })
  status: string;

  @Column({ type: 'boolean', nullable: false })
  isPaid: boolean;

  @Column({ type: 'varchar', length: 50, nullable: false })
  couponCode: string;

  @Column({ type: 'varchar', legnth: 100, nullable: false })
  reasonDestroy: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];

  @OneToOne(() => OrderDetail, (orderDetail) => orderDetail.order)
  orderDetail: OrderDetail;

  @OneToOne(() => User, (user) => user.orders)
  user: User;
}
