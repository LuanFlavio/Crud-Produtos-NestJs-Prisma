import { Injectable } from '@nestjs/common';
import { UsuarioRepository } from '../repositories/UsuarioRepository';
import { Usuario } from '../entities/Usuario';
import { hash } from 'bcrypt';

interface CreatedUsuarioRequest {
  email: string;
  name: string;
  password: string;
  usuario: string;
  cpf: string;
}

@Injectable()
export class CreateUsuarioUseCase {
  constructor(private usuarioRepository: UsuarioRepository) {}

  async execute({
    cpf,
    email,
    name,
    password,
    usuario,
  }: CreatedUsuarioRequest) {
    const _usuario = new Usuario({
      cpf,
      email,
      name,
      password: await hash(password, 10),
      usuario,
    });

    await this.usuarioRepository.create(_usuario);

    return _usuario;
  }
}
