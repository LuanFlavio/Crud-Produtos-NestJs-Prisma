import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { SignInUseCase } from 'src/modules/auth/useCases/signInUseCase/signInUseCase'
import { Public } from './decorators/isPublic'
import { LocalAuthGuard } from './guards/localAuth.guard'

@Controller()
export class AuthController {
  constructor(private signInUseCase: SignInUseCase) {}

  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  @Public()
  @UseGuards(LocalAuthGuard)
  async signIn(@Request() request: any) {
    const access_token = await this.signInUseCase.execute({
      usuario: request.user,
    })

    return { access_token }
  }
}
