import { Module } from '@nestjs/common'
import { CreateUsuarioUseCase } from 'src/modules/usuario/useCases/createUsuarioUseCase/createUsuarioUseCase'
import { UsuarioController } from './usuario.controller'
import { DatabaseModule } from 'src/infra/database/database.module'

@Module({
  imports: [DatabaseModule],
  controllers: [UsuarioController],
  providers: [CreateUsuarioUseCase],
})
export class UsuarioModule {}
