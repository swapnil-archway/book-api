import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { BooksService } from 'src/books/books.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly bookService: BooksService,
  ) {}
  async createOrder(createOrderDto: CreateOrderDto): Promise<Order | string> {
    try {
      const book = await this.bookService.findOneBook(createOrderDto.bookId);
      if (book?.id) {
        const discountedAmount =
          book.price * createOrderDto.quantity * (book.discountRate / 100);
        const order = {
          discountRate: book.discountRate,
          price: book.price,
          quantity: createOrderDto.quantity,
          totalPrice: book.price * createOrderDto.quantity - discountedAmount,
          bookId: createOrderDto.bookId,
        };
        const createdOrder = this.orderRepository.create(order);
        return this.orderRepository.save(createdOrder);
      }
      return 'No book found.';
    } catch (error) {
      throw error;
    }
  }
}
