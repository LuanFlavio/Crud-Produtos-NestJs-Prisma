import { Injectable } from '@nestjs/common'
import { Produto } from '../../entities/Produto'
import { ProdutoRepository } from '../../repositories/ProdutoRepository'

interface CreateProdutoRequest {
  nome: string
  valor: number
  quantidade: number
  usuarioId: string
}

@Injectable()
export class CreateProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute({ usuarioId, nome, quantidade, valor }: CreateProdutoRequest) {
    const produto = new Produto({
      usuarioId,
      nome,
      quantidade,
      valor,
    })

    await this.produtoRepository.create(produto)

    return produto
  }
}
