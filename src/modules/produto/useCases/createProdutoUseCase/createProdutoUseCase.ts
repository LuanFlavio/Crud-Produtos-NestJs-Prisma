import { Produto } from '../../entities/Produto'
import { ProdutoRepository } from '../../repositories/ProdutoRepository'

interface CreateProdutoRequest {
  nome: string
  valor: number
  quantidade: number
  idUsuario: string
}

export class CreateProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute({ idUsuario, nome, quantidade, valor }: CreateProdutoRequest) {
    const produto = new Produto({
      idUsuario,
      nome,
      quantidade,
      valor,
    })

    await this.produtoRepository.create(produto)

    return Produto
  }
}
