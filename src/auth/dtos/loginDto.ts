import { IsDefined, IsEmail, MaxLength, MinLength } from "class-validator";

class LoginDto {
  @IsEmail()
  @IsDefined()
  email: string;
  @MinLength(8)
  @IsDefined()
  password: string;
}

export default LoginDto;
