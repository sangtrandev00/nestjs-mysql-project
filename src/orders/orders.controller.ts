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
import { CreateOrderDto } from './dtos/create-order.dto';
import { AuthGuard } from '../guards/auth.guard';
import { CurrentUser } from '../users/decorators/current-user.decorator';
import { User } from '../users/user.entity';
import { Serialize } from '../interceptors/serialize.interceptor';
import { AdminGuard } from '../guards/admin.guard';
import { OrdersService } from './orders.service';
import { GetOrderDto } from './dtos/get-order.dto';
import { UpdateOrderDto } from './dtos/update-order.dto';
import { OrderDto } from './dtos/order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  // @Get()
  // getEstimate(@Query() query: GetEstimateDto) {
  //   return this.ordersService.createEstimate(query);
  // }

  @Get()
  getOrder(@Query() query: GetOrderDto) {
    return this.ordersService.createEstimate(query);
  }

  @Post()
  @UseGuards(AuthGuard)
  // Serialize để biến đổi interceptor cái response trả về
  @Serialize(OrderDto)
  createOrder(@Body() body: CreateOrderDto, @CurrentUser() user: User) {
    return this.ordersService.create(body, user);
  }

  // @Patch('/:id')
  // @UseGuards(AdminGuard)
  // approveReport(@Param('id') id: string, @Body() body: ApproveReportDto) {
  //   return this.ordersService.changeApproval(id, body.approved);
  // }

  @Patch('/:id')
  @UseGuards(AdminGuard)
  updateOrder(@Param('id') id: string, @Body() body: UpdateOrderDto) {
    return this.ordersService.update(id, body);
  }

  @Delete('/:id')
  @UseGuards(AdminGuard)
  deleteOrder(@Param('id') id: string) {
    return this.ordersService.delete(id);
  }
}
