import { IsDefined, IsEmail, MaxLength, MinLength } from "class-validator";

class RegisterDto {
  @MaxLength(20)
  @IsDefined()
  name: string;
  @IsEmail()
  @IsDefined()
  email: string;
  @MinLength(8)
  @IsDefined()
  password: string;
}

export default RegisterDto;
