import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { ProdutoRepository } from '../../repositories/produtoRepository'

interface EditProdutoRequest {
  nome: string
  quantidade: number
  valor: number
  produtoId: string
  usuarioId: string
}

@Injectable()
export class EditProdutoUseCase {
  constructor(private produtoRepository: ProdutoRepository) {}

  async execute({
    quantidade,
    valor,
    produtoId,
    nome,
    usuarioId,
  }: EditProdutoRequest) {
    const produto = await this.produtoRepository.findById(produtoId)

    if (!produto) throw new NotFoundException()

    if (produto.idUsuario !== usuarioId) throw new UnauthorizedException()
    produto.nome = nome
    produto.quantidade = quantidade
    produto.valor = valor

    await this.produtoRepository.save(produto)

    return produto
  }
}
