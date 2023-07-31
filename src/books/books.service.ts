import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { GetBooksDto } from './dto/get-books.dto';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) {}

  async getAllBooks(query: GetBooksDto): Promise<Book[]> {
    const { page, limit } = query;
    try {
      const skip = (page - 1) * limit;
      return this.bookRepository.find({
        skip,
        take: limit,
      });
    } catch (e) {
      throw e;
    }
  }

  async createBook(bookDto: CreateBookDto): Promise<Book> {
    const book = this.bookRepository.create(bookDto);
    return this.bookRepository.save(book);
  }

  async findOneBook(id: number): Promise<Book | undefined> {
    try {
      return await this.bookRepository.findOne({ where: { id } });
    } catch (error) {}
  }
}
