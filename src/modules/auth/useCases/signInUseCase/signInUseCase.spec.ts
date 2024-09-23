import { JwtService } from '@nestjs/jwt'
import { SignInUseCase } from './signInUseCase'
import { makeUsuario } from 'src/modules/usuario/factories/usuarioFactory'
import { UsuarioPayload } from '../../models/UsuarioPayload'

let signInUseCase: SignInUseCase
let jwtService: JwtService

describe('Sign in', () => {
  beforeEach(() => {
    jwtService = new JwtService({ secret: 'secret' })
    signInUseCase = new SignInUseCase(jwtService)
  })

  it('Deve criar um token de acesso válido', async () => {
    const usuario = makeUsuario({})

    const token = await signInUseCase.execute({
      usuario,
    })

    const payload = jwtService.decode(token) as UsuarioPayload

    expect(payload.sub).toEqual(usuario.id)
  })
})
