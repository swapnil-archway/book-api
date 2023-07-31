import { ApiProperty } from '@nestjs/swagger';

export class CreateBookDto {
  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty({ required: false })
  discountRate: number;

  @ApiProperty({ required: false })
  coverImg: string;

  @ApiProperty({ required: false })
  price: number;
}
