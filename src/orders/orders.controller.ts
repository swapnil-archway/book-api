import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    try {
      return this.ordersService.createOrder(createOrderDto);
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
