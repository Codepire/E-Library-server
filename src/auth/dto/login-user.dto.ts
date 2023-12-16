import { IsNotEmpty, IsString } from 'class-validator';

export class LoginUserDto {
    username: string;
    password: string;
}
