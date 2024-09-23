import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { AuthRequestModel } from './models/authRequestModel'
import { SignInUseCase } from 'src/modules/auth/useCases/signInUseCase/signInUseCase'
import { JwtAuthGuard } from './guards/jwtAuth.guard'
import { AuthenticatedRequestModel } from './models/authenticatedRequestModel'

@Controller()
export class AuthController {
  constructor(private signInUseCase: SignInUseCase) {}

  @Post('signIn')
  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard('local'))
  async signIn(@Request() request: AuthRequestModel) {
    const access_token = await this.signInUseCase.execute({
      usuario: request.user,
    })

    return { access_token }
  }

  @Get('Test')
  @UseGuards(JwtAuthGuard)
  async test(@Request() request: AuthenticatedRequestModel) {
    return request.user
  }
}
