import { Module } from '@nestjs/common'
import { UsuarioModule } from './infra/http/modules/usuario/usuario.module'
import { DatabaseModule } from './infra/database/database.module'
import { AuthModule } from './infra/http/modules/auth/auth.module'
import { APP_GUARD } from '@nestjs/core'
import { JwtAuthGuard } from './infra/http/modules/auth/guards/jwtAuth.guard'
import { ProdutoModule } from './infra/http/modules/produto/produto.module'

@Module({
  imports: [DatabaseModule, UsuarioModule, AuthModule, ProdutoModule],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
