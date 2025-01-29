import { IsEmail, IsString } from 'class-validator';
export class CreatePersonDto {
    @IsString()
    public name: string;
    @IsEmail()
    public email: string;
}
