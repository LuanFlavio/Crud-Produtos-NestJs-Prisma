import { randomUUID } from 'crypto'
import { Replace } from 'src/utils/replace'

interface UsuarioSchema {
  nome: string
  email: string
  password: string
  usuario: string
  cpf: string
  dataCadastro: Date
  cargo: string
}

export class Usuario {
  private props: UsuarioSchema
  private _id: string

  constructor(
    props: Replace<UsuarioSchema, { dataCadastro?: Date }>,
    id?: string,
  ) {
    this.props = {
      ...props,
      dataCadastro: props.dataCadastro || new Date(),
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

  get email(): string {
    return this.props.email
  }

  set email(email: string) {
    this.props.email = email
  }

  get password(): string {
    return this.props.password
  }

  set password(password: string) {
    this.props.password = password
  }

  get usuario(): string {
    return this.props.usuario
  }

  set usuario(usuario: string) {
    this.props.usuario = usuario
  }

  get cpf(): string {
    return this.props.cpf
  }

  set cpf(cpf: string) {
    this.props.cpf = cpf
  }

  get dataCadastro(): Date {
    return this.props.dataCadastro
  }

  set dataCadastro(dataCadastro: Date) {
    this.props.dataCadastro = dataCadastro
  }

  get cargo(): string {
    return this.props.cargo
  }

  set cargo(cargo: string) {
    this.props.cargo = cargo
  }
}
