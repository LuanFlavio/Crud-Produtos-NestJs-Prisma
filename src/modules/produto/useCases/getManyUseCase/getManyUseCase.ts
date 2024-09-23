import { Injectable } from '@nestjs/common'
import { ProdutoRepository } from '../../repositories/produtoRepository'

interface GetManyProdutoRequest {
  usuarioId: string
  page?: string
  perPage?: string
}

@Injectable()
export class GetManyProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute({ usuarioId, page, perPage }: GetManyProdutoRequest) {
    const DEFAULT_PAGE = 1
    const DEFAULT_PER_PAGE = 20
    const currentPage = Number(page) || DEFAULT_PAGE
    const currentPerPage = Number(perPage) || DEFAULT_PER_PAGE
    const produtos = await this.produtoRepository.findManyByUserId(
      usuarioId,
      currentPage,
      currentPerPage,
    )

    return produtos
  }
}
