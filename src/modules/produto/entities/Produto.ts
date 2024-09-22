interface ProdutoSchema {
  id: string;
  nome: string;
  valor: number;
  quantidade: number;
}

export class Produto {
  props: ProdutoSchema;
  _id: string;
  dataCadastro: Date;

  constructor() {}
}
