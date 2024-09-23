import { makeUsuario } from 'src/modules/usuario/factories/usuarioFactory'
import { ProdutoRepositoryInMemory } from '../../repositories/produtoRepositoryInMemory'
import { makeProduto } from '../../factories/ProdutoFactory'
import { GetManyProdutoUseCase } from './getManyUseCase'
import { Produto } from '../../entities/Produto'

let produtoRepositoryInMemory: ProdutoRepositoryInMemory
let getManyProdutoUseCase: GetManyProdutoUseCase

describe('Buscar produto em range', () => {
  beforeEach(() => {
    produtoRepositoryInMemory = new ProdutoRepositoryInMemory()
    getManyProdutoUseCase = new GetManyProdutoUseCase(produtoRepositoryInMemory)
  })

  it('Deveria buscar produtos em range', async () => {
    const usuario = makeUsuario({})
    const produtos = [...new Array(10)].map(() =>
      makeProduto({ idUsuario: usuario.id }),
    )
    produtoRepositoryInMemory.produtos = produtos
    const result = await getManyProdutoUseCase.execute({
      usuarioId: usuario.id,
    })

    expect(result).toEqual(produtos)
  })

  it('Deveria pegar só os produtos de um usuário', async () => {
    const usuario1 = makeUsuario({})
    const usuario2 = makeUsuario({})

    const produtos = [...new Array(10)].map((_, index) =>
      makeProduto({ idUsuario: index < 5 ? usuario1.id : usuario2.id }),
    )

    produtoRepositoryInMemory.produtos = produtos

    const result = await getManyProdutoUseCase.execute({
      usuarioId: usuario1.id,
    })

    expect(result).toHaveLength(5)
  })

  it('Deveria controlar a quantidade de produtos por página', async () => {
    const usuario = makeUsuario({})
    const produtos = [...new Array(10)].map(() =>
      makeProduto({ idUsuario: usuario.id }),
    )

    produtoRepositoryInMemory.produtos = produtos

    const result = await getManyProdutoUseCase.execute({
      usuarioId: usuario.id,
      perPage: '8',
    })

    expect(result).toHaveLength(8)
  })

  it('Deveria controlar os produtos por página', async () => {
    const usuario = makeUsuario({})
    const produtos = [...new Array(10)].map((_, index) =>
      makeProduto({
        idUsuario: usuario.id,
        nome: index < 5 ? 'page 1' : 'page 2',
      }),
    )

    produtoRepositoryInMemory.produtos = produtos

    let result: Produto[]

    result = await getManyProdutoUseCase.execute({
      usuarioId: usuario.id,
      perPage: '5',
      page: '2',
    })

    expect(result[0].nome).toEqual('page 2')

    result = await getManyProdutoUseCase.execute({
      usuarioId: usuario.id,
      perPage: '5',
      page: '1',
    })

    expect(result[0].nome).toEqual('page 1')
  })
})
