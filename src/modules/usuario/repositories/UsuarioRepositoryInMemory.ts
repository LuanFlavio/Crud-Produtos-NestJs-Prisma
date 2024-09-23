import { Usuario } from '../entities/Usuario'
import { UsuarioRepository } from './UsuarioRepository'

export class UsuarioRepositoryInMemory implements UsuarioRepository {
  public usuarios: Usuario[] = []

  async create(usuario: Usuario): Promise<void> {
    this.usuarios.push(usuario)
  }

  async findByCpf(cpf: string): Promise<Usuario | null> {
    const usuario = this.usuarios.find((u) => u.cpf === cpf)

    if (!usuario) return null

    return usuario
  }
}
