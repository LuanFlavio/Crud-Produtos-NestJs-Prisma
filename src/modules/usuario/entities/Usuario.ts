import { randomUUID } from 'crypto';
import { Replace } from 'src/utils/replace';

interface UsuarioSchema {
  name: string;
  email: string;
  password: string;
  usuario: string;
  cpf: string;
  dataCadastro: Date;
}

export class Usuario {
  props: UsuarioSchema;
  _id: string;

  constructor(
    props: Replace<UsuarioSchema, { dataCadastro?: Date }>,
    id?: string,
  ) {
    this.props = {
      ...props,
      dataCadastro: props.dataCadastro || new Date(),
    };
    this._id = id || randomUUID();
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  set name(name: string) {
    this.props.name = name;
  }

  get email(): string {
    return this.props.email;
  }

  set email(email: string) {
    this.props.email = email;
  }

  get password(): string {
    return this.props.password;
  }

  set password(password: string) {
    this.props.password = password;
  }

  get usuario(): string {
    return this.props.usuario;
  }

  set usuario(usuario: string) {
    this.props.usuario = usuario;
  }

  get cpf(): string {
    return this.props.cpf;
  }

  set cpf(cpf: string) {
    this.props.cpf = cpf;
  }

  get dataCadastro(): Date {
    return this.props.dataCadastro;
  }

  set dataCadastro(dataCadastro: Date) {
    this.props.dataCadastro = dataCadastro;
  }
}
