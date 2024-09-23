import { Produto } from '../entities/Produto'

type Override = Partial<Produto>

export const makeProduto = ({ id, ...override }: Override) => {
  return new Produto(
    {
      nome: 'copo',
      idUsuario: '123123',
      quantidade: 2,
      valor: 5,
      ...override,
    },
    id,
  )
}
