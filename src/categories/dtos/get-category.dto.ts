import {
  IsString,
  IsNumber
} from 'class-validator';

export class GetCategoryDto {
  @IsNumber()
  id: number;

  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsString()
  description: string;
 
}
