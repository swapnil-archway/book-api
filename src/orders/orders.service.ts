import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { BooksService } from 'src/books/books.service';

@Injectable()
export class OrdersService {
  constructor(private readonly bookService: BooksService) {}
  createOrder(createOrderDto: CreateOrderDto) {
    try {
      this.bookService.findOneBook(createOrderDto.bookId);
    } catch (error) {
      throw error;
    }
  }
}
