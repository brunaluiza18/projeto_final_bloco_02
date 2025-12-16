import {Controller,Get,Param,Body,Post,Put,Delete,Patch,HttpCode,HttpStatus,} from '@nestjs/common';
import { Produto } from '../entities/produto.entity';
import { ProdutoService } from '../service/produto.service';

@Controller('/produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  
  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(): Promise<Produto[]> {
    return this.produtoService.findAll();
  }

  
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findById(@Param('id') id: number): Promise<Produto | null> {
    return this.produtoService.findById(id);
  }

  
  @Get('/nome/:nome')
  @HttpCode(HttpStatus.OK)
  findByNome(@Param('nome') nome: string): Promise<Produto[]> {
    return this.produtoService.findByNome(nome);
  }

  // ⭐ EXTRA – BUSCAR PRODUTOS POR CATEGORIA
  @Get('/categoria/:categoriaId')
  @HttpCode(HttpStatus.OK)
  findByCategoria(
    @Param('categoriaId') categoriaId: number,
  ): Promise<Produto[]> {
    return this.produtoService.findByCategoria(categoriaId);
  }

  // ⭐ EXTRA – CONTAR PRODUTOS
  @Get('/count')
  @HttpCode(HttpStatus.OK)
  countProdutos(): Promise<number> {
    return this.produtoService.countProdutos();
  }

  
  @Post()
  @HttpCode(HttpStatus.CREATED)
  create(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.create(produto);
  }

  
  @Put()
  @HttpCode(HttpStatus.OK)
  update(@Body() produto: Produto): Promise<Produto> {
    return this.produtoService.update(produto);
  }

  // ⭐ EXTRA – ATUALIZAR APENAS A QUANTIDADE
  @Patch('/:id/quantidade')
  @HttpCode(HttpStatus.OK)
  updateQuantidade(
    @Param('id') id: number,
    @Body('quantidade') quantidade: number,
  ): Promise<Produto> {
    return this.produtoService.updateQuantidade(id, quantidade);
  }

 
  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  delete(@Param('id') id: number): Promise<void> {
    return this.produtoService.delete(id);
  }
}
