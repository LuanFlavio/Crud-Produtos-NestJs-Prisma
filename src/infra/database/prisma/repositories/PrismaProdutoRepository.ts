import { Produto } from 'src/modules/produto/entities/produto'
import { ProdutoRepository } from 'src/modules/produto/repositories/produtoRepository'
import { PrismaService } from '../prisma.service'
import { PrismaProdutoMapper } from '../mappers/PrismaProdutoMapper'
import { Injectable } from '@nestjs/common'

@Injectable()
export class PrismaProdutoRepository implements ProdutoRepository {
  constructor(private prisma: PrismaService) {}
  async create(produto: Produto): Promise<void> {
    const produtoRaw = PrismaProdutoMapper.toPrisma(produto)
    await this.prisma.produto.create({
      data: produtoRaw,
    })
  }

  async findById(id: string): Promise<Produto | null> {
    const produto = await this.prisma.produto.findUnique({
      where: {
        id,
      },
    })
    if (!produto) return null
    return PrismaProdutoMapper.toDomain(produto)
  }

  async delete(id: string): Promise<void> {
    await this.prisma.produto.delete({
      where: {
        id,
      },
    })
  }

  async save(produto: Produto): Promise<void> {
    const produtoRaw = PrismaProdutoMapper.toPrisma(produto)
    await this.prisma.produto.update({
      data: produtoRaw,
      where: {
        id: produtoRaw.id,
      },
    })
  }

  async findManyByUserId(
    userId: string,
    page: number,
    perPage: number,
  ): Promise<Produto[]> {
    const produtos = await this.prisma.produto.findMany({
      take: perPage,
      skip: (page - 1) * perPage,
    })
    return produtos.map(PrismaProdutoMapper.toDomain)
  }
}
