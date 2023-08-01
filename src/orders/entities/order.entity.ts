import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  bookId: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  price: number;

  @Column()
  quantity: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  totalPrice: number;

  @Column({ type: 'decimal', precision: 5, scale: 2 })
  discountRate: number;
}
