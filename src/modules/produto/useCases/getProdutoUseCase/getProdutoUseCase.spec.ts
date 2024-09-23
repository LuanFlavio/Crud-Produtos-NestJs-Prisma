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
    const note = makeProduto({ idUsuario: user.id })

    produtoRepositoryInMemory.produtos = [note]

    const result = await getProdutoUseCase.execute({
      produtoId: note.id,
      usuarioId: user.id,
    })

    expect(result).toEqual(note)
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
    const note = makeProduto({})

    produtoRepositoryInMemory.produtos = [note]

    expect(async () => {
      await getProdutoUseCase.execute({
        produtoId: note.id,
        usuarioId: 'fakeId',
      })
    }).rejects.toThrowError(UnauthorizedException)
  })
})
