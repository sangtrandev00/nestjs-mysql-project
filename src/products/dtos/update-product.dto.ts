import { IsString } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsString()
  description: string;
}
