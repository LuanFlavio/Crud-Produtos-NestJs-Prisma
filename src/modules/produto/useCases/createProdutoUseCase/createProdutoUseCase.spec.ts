import { ProdutoRepositoryInMemory } from '../../repositories/ProdutoRepositoryInMemory'
import { CreateProdutoUseCase } from './createProdutoUseCase'

let produtoRepositoryInMemory: ProdutoRepositoryInMemory
let createProdutoUseCase: CreateProdutoUseCase

describe('Criar Produto', () => {
  beforeEach(() => {
    produtoRepositoryInMemory = new ProdutoRepositoryInMemory()
    createProdutoUseCase = new CreateProdutoUseCase(produtoRepositoryInMemory)
  })

  it('Deveria criar um produto', async () => {
    expect(produtoRepositoryInMemory.produtos).toEqual([])

    await createProdutoUseCase.execute({
      nome: 'prato',
      usuarioId: '123123',
      quantidade: 2,
      valor: 2,
    })

    expect(produtoRepositoryInMemory.produtos.length).toBe(1)

    const produtoCriado = produtoRepositoryInMemory.produtos[0]

    expect(produtoCriado.nome).toBe('prato')
    expect(produtoCriado.idUsuario).toBe('123123')
    expect(produtoCriado.quantidade).toBe(2)
    expect(produtoCriado.valor).toBe(2)

    expect(produtoCriado.id).toBeDefined()
    expect(produtoCriado.dataCadastro).toBeInstanceOf(Date)
  })
})
