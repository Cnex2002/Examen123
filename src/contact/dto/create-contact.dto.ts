import { Type } from 'class-transformer';
import { IsNumber, IsPositive, IsString } from 'class-validator';
export class CreateContactDto {
  @IsString()
  public name: string;
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  public personId: number;
  @IsPositive()
  @IsNumber()
  @Type(() => Number)
  public propertyId: number;
}
