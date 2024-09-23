import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ProdutoRepository } from '../../repositories/produtoRepository'

interface GetProdutoRequest {
  produtoId: string
  usuarioId: string
}

@Injectable()
export class GetProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute({ produtoId, usuarioId }: GetProdutoRequest) {
    const produto = await this.produtoRepository.findById(produtoId)

    if (!produto) throw new NotFoundException()

    if (produto.idUsuario !== usuarioId) throw new UnauthorizedException()

    return produto
  }
}
