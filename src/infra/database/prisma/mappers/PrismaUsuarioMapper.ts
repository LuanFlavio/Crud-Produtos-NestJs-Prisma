import { Usuario as UsuarioRaw } from '@prisma/client'
import { Usuario } from 'src/modules/usuario/entities/Usuario'

export class PrismaUsuarioMapper {
  static toPrisma({
    cpf,
    dataCadastro,
    email,
    id,
    nome,
    password,
    usuario,
  }: Usuario): UsuarioRaw {
    return { cpf, dataCadastro, email, id, nome, password, usuario }
  }

  static toDomain({
    id,
    cpf,
    dataCadastro,
    email,
    nome,
    password,
    usuario,
  }: UsuarioRaw): Usuario {
    return new Usuario(
      {
        cpf,
        dataCadastro,
        email,
        nome,
        password,
        usuario,
      },
      id,
    )
  }
}
