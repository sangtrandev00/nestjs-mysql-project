import { IsString } from 'class-validator';

export class CreateOrderDto {
  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsString()
  description: string;
}
