import { Usuario } from 'src/modules/usuario/entities/Usuario'
import { UsuarioRepository } from 'src/modules/usuario/repositories/UsuarioRepository'
import { PrismaService } from '../prisma.service'
import { PrismaUsuarioMapper } from '../mappers/PrismaUsuarioMapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaUsuarioRepository implements UsuarioRepository {
  constructor(private prisma: PrismaService) {}
  async create(usuario: Usuario): Promise<void> {
    const usuarioRaw = PrismaUsuarioMapper.toPrisma(usuario)

    await this.prisma.usuario.create({
      data: usuarioRaw,
    })
  }

  async findByCpf(cpf: string): Promise<Usuario | null> {
    const usuario = await this.prisma.usuario.findUnique({ where: { cpf } })

    if (!usuario) return null

    return PrismaUsuarioMapper.toDomain(usuario)
  }
}
