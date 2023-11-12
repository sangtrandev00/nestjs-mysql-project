import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { CreateProductDto } from './dtos/create-product.dto';
import { User } from '../users/user.entity';
import { UpdateProductDto } from './dtos/update-product.dto';
import { GetProductDto } from './dtos/get-product.dto';

@Injectable()
export class ProductsService {
  // Thường công ty sẽ định nghĩa ra một file riêng của cái này luôn!
  constructor(@InjectRepository(Product) private repo: Repository<Product>) {}

  // Query builder example
  // createEstimate({ make, model, lng, lat, year, mileage }: GetEstimateDto) {
  //   return this.repo
  //     .createQueryBuilder()
  //     .select('AVG(price)', 'price')
  //     .where('make = :make', { make })
  //     .andWhere('model = :model', { model })
  //     .andWhere('lng - :lng BETWEEN -5 AND 5', { lng })
  //     .andWhere('lat - :lat BETWEEN -5 AND 5', { lat })
  //     .andWhere('year - :year BETWEEN -3 AND 3', { year })
  //     .andWhere('approved IS TRUE')
  //     .orderBy('ABS(mileage - :mileage)', 'DESC')
  //     .setParameters({ mileage })
  //     .limit(3)
  //     .getRawOne();
  // }

  get(query: GetProductDto) {
    return this.repo.find({ where: query });
  }

  create(productDto: CreateProductDto, user: User) {
    const product = this.repo.create(productDto);
    product.user = user;
    return this.repo.save(product);
  }

  update(id: string, attrs: Partial<UpdateProductDto>) {
    return this.repo.update({ id: parseInt(id) }, attrs);
  }

  delete(id: string) {
    return this.repo.delete({ id: parseInt(id) });
  }
}
