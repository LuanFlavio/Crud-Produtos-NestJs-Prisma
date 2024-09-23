import { makeUsuario } from 'src/modules/Usuario/factories/UsuarioFactory'
import { ProdutoRepositoryInMemory } from '../../repositories/produtoRepositoryInMemory'
import { DeleteProdutoUseCase } from './deleteprodutoUseCase'
import { makeProduto } from '../../factories/produtoFactory'
import { NotFoundException, UnauthorizedException } from '@nestjs/common'

let produtoRepositoryInMemory: ProdutoRepositoryInMemory
let deleteProdutoUseCase: DeleteProdutoUseCase

describe('Deletar produto', () => {
  beforeEach(() => {
    produtoRepositoryInMemory = new ProdutoRepositoryInMemory()
    deleteProdutoUseCase = new DeleteProdutoUseCase(produtoRepositoryInMemory)
  })

  it('Deveria deletar o produto', async () => {
    const usuario = makeUsuario({})
    const produto = makeProduto({
      idUsuario: usuario.id,
    })
    produtoRepositoryInMemory.produtos = [produto]
    await deleteProdutoUseCase.execute({
      produtoId: produto.id,
      usuarioId: usuario.id,
    })

    expect(produtoRepositoryInMemory.produtos).toHaveLength(0)
  })

  it('Deveria apresentar um erro caso não encontrasse o produto', async () => {
    expect(async () => {
      await deleteProdutoUseCase.execute({
        produtoId: 'fakeId',
        usuarioId: 'fakeId',
      })
    }).rejects.toThrowError(NotFoundException)
  })

  it('Deveria apresentar um erro caso o produto fosse de outro usuário', async () => {
    const produto = makeProduto({})
    produtoRepositoryInMemory.produtos = [produto]

    expect(async () => {
      await deleteProdutoUseCase.execute({
        produtoId: produto.id,
        usuarioId: 'fakeId',
      })
    }).rejects.toThrowError(UnauthorizedException)
  })
})
