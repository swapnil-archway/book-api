import { ApiProperty } from '@nestjs/swagger';

export class CreateOrderDto {
  @ApiProperty({ required: true })
  bookId: number;

  @ApiProperty({ required: true })
  quantity: number;
}
