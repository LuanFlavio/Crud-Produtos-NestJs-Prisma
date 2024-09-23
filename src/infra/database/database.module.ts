import { Module } from '@nestjs/common'
import { PrismaService } from './prisma/prisma.service'
import { UsuarioRepository } from 'src/modules/usuario/repositories/UsuarioRepository'
import { PrismaUsuarioRepository } from './prisma/repositories/PrismaUsuarioRepository'
import { ProdutoRepository } from 'src/modules/produto/repositories/ProdutoRepository'
import { PrismaProdutoRepository } from './prisma/repositories/PrismaProdutoRepository'

@Module({
  providers: [
    PrismaService,
    {
      provide: UsuarioRepository,
      useClass: PrismaUsuarioRepository,
    },
    {
      provide: ProdutoRepository,
      useClass: PrismaProdutoRepository,
    },
  ],
  exports: [UsuarioRepository, ProdutoRepository],
})
export class DatabaseModule {}
