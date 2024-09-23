import { NotFoundException, UnauthorizedException } from '@nestjs/common'
import { ProdutoRepository } from '../../repositories/produtoRepository'

interface GetNoteRequest {
  produtoId: string
  usuarioId: string
}

export class GetProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute({ produtoId, usuarioId }: GetNoteRequest) {
    const produto = await this.produtoRepository.findById(produtoId)

    if (!produto) throw new NotFoundException()

    if (produto.idUsuario !== usuarioId) throw new UnauthorizedException()

    return produto
  }
}
