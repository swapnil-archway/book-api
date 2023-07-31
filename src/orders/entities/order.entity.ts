import { Column, PrimaryGeneratedColumn } from 'typeorm';

export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookId: string;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  totalPrice: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  discount: number;
}
