import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty()
  bookId: string;

  @ApiProperty()
  quantity: number;

  @ApiProperty()
  totalPrice: number;
}
