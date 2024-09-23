import { UsuarioRepositoryInMemory } from 'src/modules/usuario/repositories/UsuarioRepositoryInMemory'
import { ValidateUsuarioUseCase } from './validateUsuarioUseCase'
import { hash } from 'bcrypt'
import { makeUsuario } from 'src/modules/usuario/factories/usuarioFactory'
import { UnauthorizedException } from '@nestjs/common'

let validateUsuarioUseCase: ValidateUsuarioUseCase
let usuarioRepositoryInMemory: UsuarioRepositoryInMemory

describe('Validando Usuário', () => {
  beforeEach(() => {
    usuarioRepositoryInMemory = new UsuarioRepositoryInMemory()
    validateUsuarioUseCase = new ValidateUsuarioUseCase(
      usuarioRepositoryInMemory,
    )
  })

  it('Deveria retornar o usuário se as credenciais estiverem corretas', async () => {
    const passwordUsuarioSemCripto = '1234'

    const usuario = makeUsuario({
      password: await hash(passwordUsuarioSemCripto, 10),
    })

    usuarioRepositoryInMemory.usuarios = [usuario]

    const result = await validateUsuarioUseCase.execute({
      cpf: '12312312312',
      password: passwordUsuarioSemCripto,
    })

    expect(result).toEqual(usuario)
  })

  it('Deveria exibir um erro quando as credencias estiverem erradas', async () => {
    const passwordUsuarioSemCripto = '1234'

    const usuario = makeUsuario({
      password: await hash(passwordUsuarioSemCripto, 10),
    })

    usuarioRepositoryInMemory.usuarios = [usuario]

    expect(async () => {
      await validateUsuarioUseCase.execute({
        cpf: '12errado312',
        password: passwordUsuarioSemCripto,
      })
    }).rejects.toThrow(UnauthorizedException)

    expect(async () => {
      await validateUsuarioUseCase.execute({
        cpf: '12312312312',
        password: 'errado',
      })
    }).rejects.toThrow(UnauthorizedException)
  })
})
