import { Request } from 'express'
import { Usuario } from 'src/modules/usuario/entities/Usuario'

export class AuthRequestModel extends Request {
  user: Usuario
}
