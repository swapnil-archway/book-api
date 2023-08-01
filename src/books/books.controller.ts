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
import { ApiTags } from '@nestjs/swagger';
import { Book } from './entities/book.entity';
import { BooksService, Paginated } from './books.service';
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
  ): Promise<Paginated> {
    try {
      query.limit = query.limit ? query.limit : 10;
      query.page = query.page ? query.page : 1;
      return this.bookService.getAllBooks(query);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  @Post()
  async createBook(@Body() bookDto: CreateBookDto): Promise<Book> {
    try {
      return this.bookService.createBook(bookDto);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
