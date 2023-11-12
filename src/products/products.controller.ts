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
import { CreateProductDto } from './dtos/create-product.dto';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { ProductDto } from './dtos/product.dto';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AdminGuard } from '../guards/admin.guard';
import { ProductsService } from './products.service';
import { GetProductDto } from './dtos/get-product.dto';
import { UpdateProductDto } from './dtos/update-product.dto';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getProduct(@Query() query: GetProductDto) {
    return this.productsService.get(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  // Serialize để biến đổi interceptor cái response trả về
  @Serialize(ProductDto)
  createProduct(@Body() body: CreateProductDto, @CurrentUser() user: User) {
    return this.productsService.create(body, user);
  }

  // @Patch('/:id')
  // @UseGuards(AdminGuard)
  // approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
  //   return this.productsService.changeApproval(id, body.approved);
  // }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  updateProduct(@Param('id') id: string, @Body() body: UpdateProductDto) {
    return this.productsService.update(id, body);
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  deleteProduct(@Param('id') id: string) {
    return this.productsService.delete(id);
  }
}
