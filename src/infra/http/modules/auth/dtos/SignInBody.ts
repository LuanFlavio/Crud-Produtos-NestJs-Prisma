import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class SignInBody {
  @IsNotEmpty()
  @IsString()
  cpf: string

  @IsString()
  @MinLength(4)
  password: string
}
