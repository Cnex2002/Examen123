import { IsDate, IsNumber, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePayDto {
  @Type(() => Date)
  @IsDate()
  public fecha: Date;
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  public monto: number;
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  public contactId: number;
}
