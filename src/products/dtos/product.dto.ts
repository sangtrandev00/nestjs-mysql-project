import { Expose, Transform } from 'class-transformer';

export class ProductDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  image: string;
  @Expose()
  description: string;

  @Transform(({ obj }) => obj.user.id)
  @Expose()
  userId: number;
}
