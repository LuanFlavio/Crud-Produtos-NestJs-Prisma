import { Module } from '@nestjs/common'
import { UsuarioModule } from './infra/http/modules/usuario/usuario.module'
import { DatabaseModule } from './infra/database/database.module'
import { AuthModule } from './infra/http/modules/auth/auth.module'

@Module({
  imports: [DatabaseModule, UsuarioModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
