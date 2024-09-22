import { Module } from '@nestjs/common';
import { UsuarioModule } from './infra/http/modules/usuario/usuario.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
  imports: [DatabaseModule, UsuarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
