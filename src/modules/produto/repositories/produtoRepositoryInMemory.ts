import { Produto } from '../entities/produto'
import { ProdutoRepository } from './produtoRepository'

export class ProdutoRepositoryInMemory implements ProdutoRepository {
  public produtos: Produto[] = []

  async create(produto: Produto): Promise<void> {
    this.produtos.push(produto)
  }

  async findById(id: string): Promise<Produto | null> {
    const produto = this.produtos.find((produto) => produto.id === id)
    if (!produto) return null
    return produto
  }

  async delete(id: string): Promise<void> {
    this.produtos = this.produtos.filter((produto) => produto.id !== id)
  }

  async save(produto: Produto): Promise<void> {
    const produtoIndex = this.produtos.findIndex(
      (currentproduto) => currentproduto.id === produto.id,
    )
    if (produtoIndex >= 0) this.produtos[produtoIndex] = produto
  }

  async findManyByUserId(
    idUsuario: string,
    page: number,
    perPage: number,
  ): Promise<Produto[]> {
    return this.produtos
      .filter((produto) => produto.idUsuario === idUsuario)
      .slice((page - 1) * perPage, page * perPage)
  }
}
