import { IsOptional } from "class-validator";

class GetAllProductsDto {
  @IsOptional()
  title: string;
  @IsOptional()
  start_price: number;
  @IsOptional()
  end_price: number;
  @IsOptional()
  tags: string[];
  @IsOptional()
  page: number;
  @IsOptional()
  page_size: number;
}

export default GetAllProductsDto;
