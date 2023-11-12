import { IsString } from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  name: string;

  @IsString()
  image: string;

  @IsString()
  description: string;
}
