import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {

  // Còn những decorator nào quan trọng ???
  @IsString()
  name: string;

  @IsString()
  price: number;

  @IsNumber()
  stockQty: number;

  @IsString()
  images: string;

  @IsNumber()
  discount: number;

  @IsNumber()
  views: number;

  @IsString()
  createdAt: string;

  @IsString()
  updatedAt: string;

  @IsString()
  description: string;

  @IsString()
  information: string;

  // Còn những trường là khóa ngoại thì thêm như thế nào ????
}
