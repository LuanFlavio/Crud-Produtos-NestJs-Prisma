import { makeUsuario } from 'src/modules/usuario/factories/usuarioFactory'
import { ProdutoRepositoryInMemory } from '../../repositories/produtoRepositoryInMemory'
import { makeProduto } from '../../factories/produtoFactory'
import { NotFoundException, UnauthorizedException } from '@nestjs/common'
import { GetProdutoUseCase } from './getProdutoUseCase'

let produtoRepositoryInMemory: ProdutoRepositoryInMemory
let getProdutoUseCase: GetProdutoUseCase

describe('Buscar Produto', () => {
  beforeEach(() => {
    produtoRepositoryInMemory = new ProdutoRepositoryInMemory()
    getProdutoUseCase = new GetProdutoUseCase(produtoRepositoryInMemory)
  })

  it('Deveria buscar um produto', async () => {
    const user = makeUsuario({})
    const produto = makeProduto({ idUsuario: user.id })

    produtoRepositoryInMemory.produtos = [produto]

    const result = await getProdutoUseCase.execute({
      produtoId: produto.id,
      usuarioId: user.id,
    })

    expect(result).toEqual(produto)
  })

  it('Deveria apresentar um erro quando não encontrar um produto', async () => {
    expect(async () => {
      await getProdutoUseCase.execute({
        produtoId: 'fakeId',
        usuarioId: 'fakeId',
      })
    }).rejects.toThrowError(NotFoundException)
  })

  it('Deveria apresentar um erro quando o produto tiver outro usuário', async () => {
    const produto = makeProduto({})

    produtoRepositoryInMemory.produtos = [produto]

    expect(async () => {
      await getProdutoUseCase.execute({
        produtoId: produto.id,
        usuarioId: 'fakeId',
      })
    }).rejects.toThrowError(UnauthorizedException)
  })
})
