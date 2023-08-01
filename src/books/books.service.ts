import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBooksDto } from './dto/get-books.dto';

export class Paginated {
  data: Book[];

  page: number;

  limit: number;

  total: number;

  lastPage: number;
}

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async getAllBooks(query: GetBooksDto): Promise<Paginated> {
    try {
      const { page, limit } = query;
      const skip = (page - 1) * limit;

      const [data, total] = await this.bookRepository.findAndCount({
        skip,
        take: limit,
      });

      const lastPage = Math.ceil(total / limit);
      const finalData: Paginated = {
        data,
        page,
        limit,
        total,
        lastPage,
      };

      return finalData;
    } catch (err) {
      throw err;
    }
  }

  async createBook(bookDto: CreateBookDto): Promise<Book> {
    try {
      const book = this.bookRepository.create(bookDto);
      return this.bookRepository.save(book);
    } catch (error) {
      throw error;
    }
  }

  async findOneBook(id: number): Promise<Book | undefined> {
    try {
      return await this.bookRepository.findOne({ where: { id } });
    } catch (error) {}
  }
}
