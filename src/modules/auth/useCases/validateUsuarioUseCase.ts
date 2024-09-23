import { Injectable, UnauthorizedException } from '@nestjs/common'
import { compare } from 'bcrypt'
import { UsuarioRepository } from 'src/modules/usuario/repositories/UsuarioRepository'

interface ValidateUsuarioRequest {
  cpf: string
  password: string
}

@Injectable()
export class ValidateUsuarioUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute({ cpf, password }: ValidateUsuarioRequest) {
    const usuario = await this.usuarioRepository.findByCpf(cpf)

    if (usuario) {
      const isPasswordMatched = await compare(password, usuario.password)

      if (isPasswordMatched) return usuario
    }

    throw new UnauthorizedException('Cpf ou senha incorretos')
  }
}
