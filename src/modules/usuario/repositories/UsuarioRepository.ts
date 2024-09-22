import { Usuario } from '../entities/Usuario';

export abstract class UsuarioRepository {
  abstract create(usuario: Usuario): Promise<void>;
}
