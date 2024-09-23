import { Produto } from '../entities/Produto'
export abstract class ProdutoRepository {
  abstract create(produto: Produto): Promise<void>
  abstract findById(id: string): Promise<Produto | null>
  abstract delete(id: string): Promise<void>
  abstract save(produto: Produto): Promise<void>
  abstract findManyByUserId(
    idUsuario: string,
    page: number,
    perPage: number,
  ): Promise<Produto[]>
}
