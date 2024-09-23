import { Usuario } from '../entities/Usuario'

type Override = Partial<Usuario>

export const makeUsuario = ({ id, ...override }: Override) => {
  return new Usuario(
    {
      nome: 'Teste',
      email: 'teste@email.com',
      password: '1234',
      usuario: 'teste',
      cpf: '12312312312',
      ...override,
    },
    id,
  )
}
