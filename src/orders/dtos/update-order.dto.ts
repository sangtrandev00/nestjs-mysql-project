import { IsString } from 'class-validator';

export class UpdateOrderDto {
  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsString()
  description: string;
}
