import { ProdutoRepository } from '../../repositories/produtoRepository'

interface GetManyProdutoRequest {
  idUsuario: string
  page?: string
  perPage?: string
}

export class GetManyProdutoUseCase {
  constructor(private noteRepository: ProdutoRepository) {}

  async execute({ idUsuario, page, perPage }: GetManyProdutoRequest) {
    const DEFAULT_PAGE = 1
    const DEFAULT_PER_PAGE = 20
    const currentPage = Number(page) || DEFAULT_PAGE
    const currentPerPage = Number(perPage) || DEFAULT_PER_PAGE
    const notes = await this.noteRepository.findManyByUserId(
      idUsuario,
      currentPage,
      currentPerPage,
    )

    return notes
  }
}
