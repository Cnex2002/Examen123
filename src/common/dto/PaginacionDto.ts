import { Type } from 'class-transformer';
import { IsOptional, IsPositive, IsString } from 'class-validator';

export class PaginationDto {
  //PRIMER FILTRO PARA QUE NO INGRESE CODIGO MALISIOSO
  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  page: number = 1;

  @IsPositive()
  @IsOptional()
  @Type(() => Number)
  limit: number = 1;
}
