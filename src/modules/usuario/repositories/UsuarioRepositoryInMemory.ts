import { Usuario } from '../entities/Usuario';
import { UsuarioRepository } from './UsuarioRepository';

export class UsuarioRepositoryInMemory implements UsuarioRepository {
  public usuarios: Usuario[] = [];

  async create(usuario: Usuario): Promise<void> {
    this.usuarios.push(usuario);
  }
}
