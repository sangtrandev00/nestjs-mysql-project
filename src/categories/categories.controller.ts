import {
  Controller,
  Post,
  Body,
  UseGuards,
  Patch,
  Param,
  Get,
  Query,
  Delete,
} from '@nestjs/common';
import { CreateCategoryDto } from './dtos/create-category.dto';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { CategoryDto } from './dtos/category.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AdminGuard } from '../guards/admin.guard';
import { CategoriesService } from './categories.service';
import { GetCategoryDto } from './dtos/get-category.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private categoriesService: CategoriesService) {}

  // @Get()
  // getEstimate(@Query() query: GetEstimateDto) {
  //   return this.categoriesService.createEstimate(query);
  // }

  @Get()
  getCategory(@Query() query: GetCategoryDto) {
    return this.categoriesService.createEstimate(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  // Serialize để biến đổi interceptor cái response trả về
  @Serialize(CategoryDto)
  createCategory(@Body() body: CreateCategoryDto, @CurrentUser() user: User) {
    return this.categoriesService.create(body, user);
  }

  // @Patch('/:id')
  // @UseGuards(AdminGuard)
  // approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
  //   return this.categoriesService.changeApproval(id, body.approved);
  // }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  updateCategory(@Param('id') id: string, @Body() body: UpdateCategoryDto) {
    return this.categoriesService.update(id, body);
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  deleteCategory(@Param('id') id: string) {
    return this.categoriesService.delete(id);
  }
}
