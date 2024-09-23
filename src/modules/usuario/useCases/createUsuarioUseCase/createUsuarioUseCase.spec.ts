import { compare } from 'bcrypt'
import { UsuarioRepositoryInMemory } from '../../repositories/UsuarioRepositoryInMemory'
import { CreateUsuarioUseCase } from './createUsuarioUseCase'

let createUsuarioUseCase: CreateUsuarioUseCase
let usuarioRepositoryInMemory: UsuarioRepositoryInMemory

describe('Criando Usuário', () => {
  beforeEach(() => {
    usuarioRepositoryInMemory = new UsuarioRepositoryInMemory()
    createUsuarioUseCase = new CreateUsuarioUseCase(usuarioRepositoryInMemory)
  })

  it('Deveria criar um usuário', async () => {
    expect(usuarioRepositoryInMemory.usuarios).toEqual([])

    const usuario = await createUsuarioUseCase.execute({
      cpf: '12301203102',
      email: 'teste@teste.com',
      nome: 'Teste',
      password: '1234',
      usuario: 'teste',
    })

    expect(usuarioRepositoryInMemory.usuarios).toEqual([usuario])
  })

  it('Deveria criar um usuário com criptografia na senha', async () => {
    const passwordUsuarioSemCripto = '1234'

    const usuario = await createUsuarioUseCase.execute({
      cpf: '12301203102',
      email: 'teste@teste.com',
      nome: 'Teste',
      password: passwordUsuarioSemCripto,
      usuario: 'teste',
    })

    const usuarioPasswordEncriptada = await compare(
      passwordUsuarioSemCripto,
      usuario.password,
    )

    expect(usuarioPasswordEncriptada).toBeTruthy()
  })
})
