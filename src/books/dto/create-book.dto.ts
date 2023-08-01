import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, Max, Min } from 'class-validator';

export class CreateBookDto {
  @ApiProperty({ required: true })
  title: string;

  @ApiProperty({ required: false })
  description: string;

  @ApiProperty({ required: false })
  @IsNumber()
  discountRate: number;

  @ApiProperty({ required: false })
  coverImg: string;

  @ApiProperty({ required: false })
  @IsNumber()
  price: number;
}
