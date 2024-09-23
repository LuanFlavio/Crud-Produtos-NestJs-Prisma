import { Usuario } from 'src/modules/usuario/entities/Usuario'

export class UsuarioViewModel {
  static toHttp({
    cpf,
    dataCadastro,
    email,
    id,
    nome,
    usuario,
    cargo,
  }: Usuario) {
    return {
      cpf,
      dataCadastro,
      email,
      id,
      nome,
      usuario,
      cargo,
    }
  }
}
