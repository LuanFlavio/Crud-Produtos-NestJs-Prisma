import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator'

export class CreateProdutoBody {
  @IsString()
  @IsNotEmpty()
  nome: string

  @IsNumber()
  @IsOptional()
  valor: string

  @IsNumber()
  @IsOptional()
  quantidade: string
}
