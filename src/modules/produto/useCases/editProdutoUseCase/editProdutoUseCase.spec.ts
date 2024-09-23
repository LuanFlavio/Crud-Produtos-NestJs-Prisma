import { makeUsuario } from 'src/modules/usuario/factories/usuarioFactory'
import { ProdutoRepositoryInMemory } from '../../repositories/produtoRepositoryInMemory'
import { makeProduto } from '../../factories/ProdutoFactory'
import { NotFoundException, UnauthorizedException } from '@nestjs/common'
import { EditProdutoUseCase } from './editProdutoUseCase'

let produtoRepositoryInMemory: ProdutoRepositoryInMemory
let editProdutoUseCase: EditProdutoUseCase

describe('Editar Produto', () => {
  beforeEach(() => {
    produtoRepositoryInMemory = new ProdutoRepositoryInMemory()
    editProdutoUseCase = new EditProdutoUseCase(produtoRepositoryInMemory)
  })

  it('Deveria editar o produto', async () => {
    const usuario = makeUsuario({})
    const produto = makeProduto({
      idUsuario: usuario.id,
    })

    produtoRepositoryInMemory.produtos = [produto]

    const nomeChanged = 'Prato teste 2'
    const quantidadeChanged = 12
    const valorChanged = 123

    await editProdutoUseCase.execute({
      nome: nomeChanged,
      quantidade: quantidadeChanged,
      valor: valorChanged,
      produtoId: produto.id,
      usuarioId: usuario.id,
    })

    expect(produtoRepositoryInMemory.produtos[0].nome).toEqual(nomeChanged)

    expect(produtoRepositoryInMemory.produtos[0].quantidade).toEqual(
      quantidadeChanged,
    )

    expect(produtoRepositoryInMemory.produtos[0].valor).toEqual(valorChanged)
  })

  it('Deveria apresentar um erro quando não encontrar o produto', async () => {
    expect(async () => {
      await editProdutoUseCase.execute({
        nome: 'prato teste 3',
        quantidade: 1,
        valor: 1,
        produtoId: 'fakeId',
        usuarioId: 'fakeId',
      })
    }).rejects.toThrowError(NotFoundException)
  })

  it('Deveria apresentar um erro quando o produto tiver outro usuário', async () => {
    const produto = makeProduto({})

    produtoRepositoryInMemory.produtos = [produto]

    expect(async () => {
      await editProdutoUseCase.execute({
        nome: 'prato teste 3',
        quantidade: 1,
        valor: 1,
        produtoId: produto.id,
        usuarioId: 'fakeId',
      })
    }).rejects.toThrowError(UnauthorizedException)
  })
})
