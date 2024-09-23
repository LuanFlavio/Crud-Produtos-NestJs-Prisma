import { Module } from '@nestjs/common'
import { ProdutoController } from './produto.controller'
import { DatabaseModule } from 'src/infra/database/database.module'
import { CreateProdutoUseCase } from 'src/modules/produto/useCases/createProdutoUseCase/createProdutoUseCase'
import { DeleteProdutoUseCase } from 'src/modules/produto/useCases/deleteProdutoUseCase/deleteProdutoUseCase'
import { EditProdutoUseCase } from 'src/modules/produto/useCases/editProdutoUseCase/editProdutoUseCase'
import { GetManyProdutoUseCase } from 'src/modules/produto/useCases/getManyUseCase/getManyUseCase'
import { GetProdutoUseCase } from 'src/modules/produto/useCases/getProdutoUseCase/getProdutoUseCase'

@Module({
  imports: [DatabaseModule],
  controllers: [ProdutoController],
  providers: [
    GetProdutoUseCase,
    EditProdutoUseCase,
    DeleteProdutoUseCase,
    CreateProdutoUseCase,
    GetManyProdutoUseCase,
  ],
})
export class ProdutoModule {}
