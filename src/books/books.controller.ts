import {
  Controller,
  Get,
  Post,
  Body,
  ValidationPipe,
  Query,
  BadRequestException,
} from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { ApiTags, ApiBadRequestResponse } from '@nestjs/swagger';
import { Book } from './entities/book.entity';
import { BooksService } from './books.service';
import { GetBooksDto } from './dto/get-books.dto';

@ApiTags('books')
@Controller('books')
export class BooksController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  async getAllBooks(
    @Query(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
      }),
    )
    query: GetBooksDto,
  ): Promise<Book[]> {
    try {
      query.limit = query.limit ? query.limit : 10;
      query.page = query.page ? query.page : 1;
      return this.bookService.getAllBooks(query);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post()
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async createBook(@Body() bookDto: CreateBookDto): Promise<Book> {
    return this.bookService.createBook(bookDto);
  }

  @Post('/order')
  @ApiBadRequestResponse({ description: 'Bad Request' })
  async orderBook(@Body() bookDto: CreateBookDto): Promise<Book> {
    return this.bookService.createBook(bookDto);
  }
}
