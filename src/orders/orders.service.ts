import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './order.entity';
import { CreateOrderDto } from './dtos/create-order.dto';
import { User } from '../users/user.entity';
import { GetEstimateDto } from './dtos/get-estimate.dto';
import { UpdateCategoryDto, UpdateOrderDto } from './dtos/update-order.dto';
import { GetOrderDto } from './dtos/get-order.dto';

@Injectable()
export class OrdersService {
  // Thường công ty sẽ định nghĩa ra một file riêng của cái này luôn!
  constructor(@InjectRepository(Order) private repo: Repository<Order>) {}

  // Query builder example
  createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
    return this.repo
      .createQueryBuilder()
      .select('AVG(price)', 'price')
      .where('make = :make', { make })
      .andWhere('model = :model', { model })
      .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
      .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
      .andWhere('year - :year BETWEEN -3 AND 3', { year })
      .andWhere('approved IS TRUE')
      .orderBy('ABS(mileage - :mileage)', 'DESC')
      .setParameters({ mileage })
      .limit(3)
      .getRawOne();
  }

  get(query: GetOrderDto) {
    return this.repo.find({ where: query });
  }

  create(orderDto: CreateOrderDto, user: User) {
    const order = this.repo.create(orderDto);
    order.user = user;
    return this.repo.save(order);
  }

  update(id: string, attrs: Partial<UpdateOrderDto>) {
    return this.repo.update({ id: parseInt(id) }, attrs);
  }

  // async changeApproval(id: string, approved: boolean) {
  //   const report = await this.repo.findOne({ where: { id: parseInt(id) } });

  //   if (!report) {
  //     throw new NotFoundException('report not found');
  //   }

  //   report.approved = approved;
  //   return this.repo.save(report);
  // }

  delete(id: string) {
    return this.repo.delete({ id: parseInt(id) });
  }
}
