import { MiddlewareConsumer, Module } from '@nestjs/common'
import { AuthController } from './auth.controller'
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy'
import { ValidateUsuarioUseCase } from 'src/modules/auth/useCases/validateUsuarioUseCase/validateUsuarioUseCase'
import { UsuarioModule } from '../usuario/usuario.module'
import { DatabaseModule } from 'src/infra/database/database.module'
import { SignInDTOValidateMiddleware } from './middleware/signInDTOValidate.middleware'
import { SignInUseCase } from 'src/modules/auth/useCases/signInUseCase/signInUseCase'
import { JwtModule } from '@nestjs/jwt'
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy'

@Module({
  imports: [
    DatabaseModule,
    UsuarioModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRE },
    }),
  ],
  controllers: [AuthController],
  providers: [
    JwtStrategy,
    LocalStrategy,
    ValidateUsuarioUseCase,
    SignInUseCase,
  ],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignInDTOValidateMiddleware).forRoutes('/signIn')
  }
}
