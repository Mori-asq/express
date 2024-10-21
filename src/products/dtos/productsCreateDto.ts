import { IsDefined, IsOptional, MaxLength } from "class-validator";

class CreateProductDto {
  @MaxLength(20)
  @IsDefined()
  title: string;
  @IsDefined()
  description: string;
  @IsDefined()
  price: number;
  @IsOptional()
  tags: string[];
  @IsOptional()
  user: string;
}

export default CreateProductDto;
