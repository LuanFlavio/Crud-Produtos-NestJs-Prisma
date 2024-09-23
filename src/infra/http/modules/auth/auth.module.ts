import { MiddlewareConsumer, Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy'
import { ValidateUsuarioUseCase } from 'src/modules/auth/useCases/validateUsuarioUseCase'
import { UsuarioModule } from '../usuario/usuario.module'
import { DatabaseModule } from 'src/infra/database/database.module'
import { SignInDTOValidateMiddleware } from './middleware/signInDTOValidate.middleware'

@Module({
  imports: [DatabaseModule, UsuarioModule],
  controllers: [AuthController],
  providers: [LocalStrategy, ValidateUsuarioUseCase],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignInDTOValidateMiddleware).forRoutes('/signIn')
  }
}
