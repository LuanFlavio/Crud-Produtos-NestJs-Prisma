import { Produto } from '../../../../../modules/produto/entities/produto'

export class ProdutoViewModel {
  static toHtpp({ id, nome, valor, quantidade, dataCadastro }: Produto) {
    return {
      id,
      nome,
      valor,
      quantidade,
      dataCadastro,
    }
  }
}
