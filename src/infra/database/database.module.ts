import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { UsuarioRepository } from 'src/modules/usuario/repositories/UsuarioRepository'
import { PrismaUsuarioRepository } from './prisma/repositories/PrismaUsuarioRepository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UsuarioRepository,
      useClass: PrismaUsuarioRepository,
    },
  ],
  exports: [UsuarioRepository],
})
export class DatabaseModule {}
