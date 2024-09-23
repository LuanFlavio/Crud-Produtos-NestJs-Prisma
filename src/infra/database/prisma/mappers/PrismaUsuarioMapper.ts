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
    cargo,
  }: Usuario): UsuarioRaw {
    return { cpf, dataCadastro, email, id, nome, password, usuario, cargo }
  }

  static toDomain({
    id,
    cpf,
    dataCadastro,
    email,
    nome,
    password,
    usuario,
    cargo,
  }: UsuarioRaw): Usuario {
    return new Usuario(
      {
        cpf,
        dataCadastro,
        email,
        nome,
        password,
        usuario,
        cargo,
      },
      id,
    )
  }
}
