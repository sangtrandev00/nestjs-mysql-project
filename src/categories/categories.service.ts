import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { User } from '../users/user.entity';
import { UpdateCategoryDto } from './dtos/update-category.dto';
import { GetCategoryDto } from './dtos/get-category.dto';

@Injectable()
export class CategoriesService {
  // Thường công ty sẽ định nghĩa ra một file riêng của cái này luôn!
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

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

  get(query: GetCategoryDto) {
    return this.repo.find({ where: query });
  }

  create(categoryDto: CreateCategoryDto, user: User) {
    const category = this.repo.create(categoryDto);
    category.user = user;
    return this.repo.save(category);
  }

  update(id: string, attrs: Partial<UpdateCategoryDto>) {
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
