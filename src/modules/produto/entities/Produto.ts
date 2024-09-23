import { randomUUID } from 'crypto'
import { Replace } from 'src/utils/replace'

interface ProdutoSchema {
  nome: string
  valor: number
  quantidade: number
  usuarioId: string
  dataCadastro: Date
}

export class Produto {
  private props: ProdutoSchema
  private _id: string

  constructor(
    props: Replace<ProdutoSchema, { dataCadastro?: Date }>,
    id?: string,
  ) {
    this.props = {
      ...props,
      dataCadastro: props.dataCadastro ?? new Date(),
    }

    this._id = id || randomUUID()
  }

  get id(): string {
    return this._id
  }

  get nome(): string {
    return this.props.nome
  }

  set nome(nome: string) {
    this.props.nome = nome
  }

  get valor(): number {
    return this.props.valor
  }

  set valor(valor: number) {
    this.props.valor = valor
  }

  get quantidade(): number {
    return this.props.quantidade
  }

  set quantidade(quantidade: number) {
    this.props.quantidade = quantidade
  }

  get idUsuario(): string {
    return this.props.usuarioId
  }

  get dataCadastro(): Date {
    return this.props.dataCadastro
  }
}
