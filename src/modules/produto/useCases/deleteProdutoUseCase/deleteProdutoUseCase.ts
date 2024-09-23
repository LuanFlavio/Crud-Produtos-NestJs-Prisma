import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ProdutoRepository } from '../../repositories/produtoRepository'

interface DeleteprodutoRequest {
  produtoId: string
  usuarioId: string
}

@Injectable()
export class DeleteProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute({ produtoId, usuarioId: userId }: DeleteprodutoRequest) {
    const produto = await this.produtoRepository.findById(produtoId)

    if (!produto) throw new NotFoundException()

    if (produto.idUsuario !== userId) throw new UnauthorizedException()

    await this.produtoRepository.delete(produtoId)
  }
}
