import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common'
import { CreateProdutoUseCase } from '../../../../modules/produto/useCases/createProdutoUseCase/createProdutoUseCase'
import { AuthenticatedRequestModel } from '../auth/models/authenticatedRequestModel'
import { CreateProdutoBody } from './dtos/createProdutoBody'
import { ProdutoViewModel } from './viewModels/produtoViewModel'
import { DeleteProdutoUseCase } from '../../../../modules/produto/useCases/deleteProdutoUseCase/deleteProdutoUseCase'
import { EditProdutoUseCase } from '../../../../modules/produto/useCases/editProdutoUseCase/editProdutoUseCase'
import { EditProdutoBody } from './dtos/editProdutoBody'
import { GetProdutoUseCase } from '../../../../modules/produto/useCases/getProdutoUseCase/getProdutoUseCase'
import { GetManyProdutoUseCase } from '../../../../modules/produto/useCases/getManyUseCase/getManyUseCase'

@Controller('produtos')
export class ProdutoController {
  constructor(
    private createProdutoUseCase: CreateProdutoUseCase,
    private deleteProdutoUseCase: DeleteProdutoUseCase,
    private editProdutoUseCase: EditProdutoUseCase,
    private getProdutoUseCase: GetProdutoUseCase,
    private getManyProdutoUseCase: GetManyProdutoUseCase,
  ) {}

  @Post()
  async createProduto(
    @Request() request: AuthenticatedRequestModel,
    @Body() body: CreateProdutoBody,
  ) {
    const { nome, valor, quantidade } = body
    const produto = await this.createProdutoUseCase.execute({
      nome,
      valor: Number(valor),
      quantidade: Number(quantidade),
      usuarioId: request.user.id,
    })
    return ProdutoViewModel.toHtpp(produto)
  }

  @Delete(':id')
  async deleteProduto(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') produtoId: string,
  ) {
    await this.deleteProdutoUseCase.execute({
      produtoId,
      usuarioId: request.user.id,
    })
  }

  @Put(':id')
  async editProduto(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') produtoId: string,
    @Body() body: EditProdutoBody,
  ) {
    const { nome, valor, quantidade } = body
    await this.editProdutoUseCase.execute({
      produtoId,
      usuarioId: request.user.id,
      nome,
      valor: Number(valor),
      quantidade: Number(quantidade),
    })
  }

  @Get(':id')
  async getProduto(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') produtoId: string,
  ) {
    const produto = await this.getProdutoUseCase.execute({
      produtoId,
      usuarioId: request.user.id,
    })
    return ProdutoViewModel.toHtpp(produto)
  }

  @Get()
  async getManyProduto(
    @Request() request: AuthenticatedRequestModel,
    @Query('page') page: string,
    @Query('perPage') perPage: string,
  ) {
    const users = await this.getManyProdutoUseCase.execute({
      usuarioId: request.user.id,
      page,
      perPage,
    })
    return users.map(ProdutoViewModel.toHtpp)
  }
}
