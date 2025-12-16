import { Controller, Get, Param, Body, Post, Put, Delete, HttpCode, HttpStatus } from '@nestjs/common';
import { Produto } from '../entities/produto.entity';
import { ProdutoService } from '../service/produto.service';

@Controller('produtos')
export class ProdutoController {
    constructor(private readonly produtoService: ProdutoService) {}

    @Get()
    @HttpCode(HttpStatus.OK)
    async findAll(): Promise<Produto[]> {
        return await this.produtoService.findAll();
    }

    @Get(':id')
    @HttpCode(HttpStatus.OK)
    async findById(@Param('id') id: number): Promise<Produto | null> {
        return await this.produtoService.findById(id);
    }

    @Get('nome/:nome')
    @HttpCode(HttpStatus.OK)
    async findByNome(@Param('nome') nome: string): Promise<Produto[]> {
        return await this.produtoService.findByNome(nome);
    }

    @Post()
    @HttpCode(HttpStatus.CREATED)
    async create(@Body() produto: Produto): Promise<Produto> {
        return await this.produtoService.create(produto);
    }

    @Put()
    @HttpCode(HttpStatus.OK)
    async update(@Body() produto: Produto): Promise<Produto> {
        return await this.produtoService.update(produto);
    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    async delete(@Param('id') id: number): Promise<void> {
        await this.produtoService.delete(id);
    }
}
