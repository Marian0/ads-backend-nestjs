import { IsEmail, IsNotEmpty, IsString } from "class-validator";

export class UserSignUpDTO {
  @IsNotEmpty()
  @IsEmail()
  readonly email: string;
  @IsNotEmpty()
  @IsString()
  readonly password: string;
}
