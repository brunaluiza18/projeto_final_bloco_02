import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categoria } from './entities/categoria.entity';
import { Produto } from '../produto/entities/produto.entity';
import { CategoriaService } from './service/categoria.service';
import { CategoriaController } from './controller/categoria.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Categoria, Produto])],
  providers: [CategoriaService],
  controllers: [CategoriaController],
})
export class CategoriaModule {}
