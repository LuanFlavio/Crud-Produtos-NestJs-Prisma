import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator'

export class CreateUsuarioBody {
  @IsString()
  @IsEmail()
  @IsNotEmpty()
  email: string

  @IsString()
  @IsNotEmpty()
  nome: string

  @IsString()
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  @MinLength(4)
  usuario: string

  @IsString()
  @IsNotEmpty()
  cpf: string
}
