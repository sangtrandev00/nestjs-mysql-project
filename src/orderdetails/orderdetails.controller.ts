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
import { CreateCategoryDto } from './dtos/create-orderdetail.dto';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { CategoryDto } from './dtos/orderdetail.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AdminGuard } from '../guards/admin.guard';
import { OrderDetailsService } from './orderdetails.service';
import { GetCategoryDto, GetOrderDetailDto } from './dtos/get-orderdetail.dto';
import { UpdateCategoryDto } from './dtos/update-category.dto';

@Controller('orderdetails')
export class OrderDetailsController {
  constructor(private categoriesService: OrderDetailsService) {}

  // @Get()
  // getEstimate(@Query() query: GetEstimateDto) {
  //   return this.categoriesService.createEstimate(query);
  // }

  @Get()
  getOrderDetail(@Query() query: GetOrderDetailDto) {
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
