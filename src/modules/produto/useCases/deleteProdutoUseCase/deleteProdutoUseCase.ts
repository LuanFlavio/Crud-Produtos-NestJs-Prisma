import { NotFoundException, UnauthorizedException } from '@nestjs/common'
import { ProdutoRepository } from '../../repositories/produtoRepository'

interface DeleteprodutoRequest {
  produtoId: string
  idUsuario: string
}

export class DeleteProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute({ produtoId, idUsuario: userId }: DeleteprodutoRequest) {
    const produto = await this.produtoRepository.findById(produtoId)

    if (!produto) throw new NotFoundException()

    if (produto.idUsuario !== userId) throw new UnauthorizedException()

    await this.produtoRepository.delete(produtoId)
  }
}
