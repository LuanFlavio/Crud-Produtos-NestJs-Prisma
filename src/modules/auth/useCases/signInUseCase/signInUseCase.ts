import { Injectable } from '@nestjs/common'
import { UsuarioPayload } from '../../models/UsuarioPayload'
import { JwtService } from '@nestjs/jwt'
import { Usuario } from 'src/modules/usuario/entities/Usuario'

interface SignInRequest {
  usuario: Usuario
}

@Injectable()
export class SignInUseCase {
  constructor(private jwtService: JwtService) {}

  async execute({ usuario }: SignInRequest) {
    const payload: UsuarioPayload = {
      sub: usuario.id,
      cpf: usuario.cpf,
      nome: usuario.nome,
      dataCadastro: usuario.dataCadastro.toJSON(),
      cargo: usuario.cargo,
    }

    const jwtToken = this.jwtService.sign(payload)

    return jwtToken
  }
}
