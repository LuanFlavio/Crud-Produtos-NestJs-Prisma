import { Body, Controller, Post } from '@nestjs/common'
import { CreateUsuarioUseCase } from 'src/modules/usuario/useCases/createUsuarioUseCase/createUsuarioUseCase'
import { CreateUsuarioBody } from './dtos/usuarioBody'
import { UsuarioViewModel } from './viewModel/viewModel'

@Controller('usuarios')
export class UsuarioController {
  constructor(private createUsuarioUseCase: CreateUsuarioUseCase) {}

  @Post()
  async createPost(@Body() body: CreateUsuarioBody) {
    const { cpf, email, nome, password, usuario, cargo } = body

    const _usuario = await this.createUsuarioUseCase.execute({
      cpf,
      email,
      nome,
      password,
      usuario,
      cargo,
    })

    return UsuarioViewModel.toHttp(_usuario)
  }
}
