import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  coverImg: string;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  discountRate: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  price: number;
}
