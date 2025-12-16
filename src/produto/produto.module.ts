import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Produto } from './entities/produto.entity';
import { ProdutoService } from './service/produto.service';
import { ProdutoController } from './controller/produto.controller';
import { Categoria } from '../categoria/entities/categoria.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Produto, Categoria])], // importante
  providers: [ProdutoService],
  controllers: [ProdutoController],
})
export class ProdutoModule {}
