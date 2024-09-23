import { compare } from 'bcrypt'
import { UsuarioRepositoryInMemory } from '../../repositories/UsuarioRepositoryInMemory'
import { CreateUsuarioUseCase } from './createUsuarioUseCase'
import { makeUsuario } from '../../factories/usuarioFactory'

let createUsuarioUseCase: CreateUsuarioUseCase
let usuarioRepositoryInMemory: UsuarioRepositoryInMemory

describe('Criando Usuário', () => {
  beforeEach(() => {
    usuarioRepositoryInMemory = new UsuarioRepositoryInMemory()
    createUsuarioUseCase = new CreateUsuarioUseCase(usuarioRepositoryInMemory)
  })

  it('Deveria criar um usuário', async () => {
    expect(usuarioRepositoryInMemory.usuarios).toEqual([])

    const usuario = await createUsuarioUseCase.execute(makeUsuario({}))

    expect(usuarioRepositoryInMemory.usuarios).toEqual([usuario])
  })

  it('Deveria criar um usuário com criptografia na senha', async () => {
    const passwordUsuarioSemCripto = '1234'

    const usuario = await createUsuarioUseCase.execute(
      makeUsuario({
        password: passwordUsuarioSemCripto,
      }),
    )

    const usuarioPasswordEncriptada = await compare(
      passwordUsuarioSemCripto,
      usuario.password,
    )

    expect(usuarioPasswordEncriptada).toBeTruthy()
  })
})
