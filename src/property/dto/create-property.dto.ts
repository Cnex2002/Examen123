import { IsEmail, IsString } from 'class-validator';

export class CreatePropertyDto {
  @IsString()
  public name: string;
  @IsString()
  public address: string;
}
