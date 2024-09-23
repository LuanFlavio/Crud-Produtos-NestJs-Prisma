import { Strategy } from 'passport-local'
import { PassportStrategy } from '@nestjs/passport'
import { Injectable } from '@nestjs/common'
import { ValidateUsuarioUseCase } from '../useCases/validateUsuarioUseCase'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private validateUsuarioUseCase: ValidateUsuarioUseCase) {
    super({
      usernameField: 'cpf',
    })
  }

  async validate(cpf: string, password: string) {
    return await this.validateUsuarioUseCase.execute({ cpf, password })
  }
}
