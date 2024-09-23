export class AuthenticatedRequestModel extends Request {
  user: {
    id: string
    cpf: string
    nome: string
    dataCadastro: string
  }
}
