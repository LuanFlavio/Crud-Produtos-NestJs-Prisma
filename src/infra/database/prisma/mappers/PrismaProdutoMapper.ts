import { Produto as ProdutoRaw } from '@prisma/client'
import { Produto } from 'src/modules/produto/entities/produto'
export class PrismaProdutoMapper {
  static toPrisma({
    dataCadastro,
    nome,
    id,
    quantidade,
    valor,
    idUsuario,
  }: Produto): ProdutoRaw {
    return {
      dataCadastro,
      nome,
      id,
      quantidade,
      valor,
      usuarioId: idUsuario,
    }
  }
  static toDomain({
    dataCadastro,
    nome,
    id,
    quantidade,
    valor,
    usuarioId,
  }: ProdutoRaw): Produto {
    return new Produto(
      {
        dataCadastro,
        nome,
        quantidade,
        valor,
        usuarioId,
      },
      id,
    )
  }
}
