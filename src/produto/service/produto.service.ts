import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Produto } from './entities/produto.entity';

@Injectable()
export class ProdutoService {
    constructor(
        @InjectRepository(Produto)
        private produtoRepository: Repository<Produto>
    ) {}

    async findAll(): Promise<Produto[]> {
        return await this.produtoRepository.find({
            relations: {
                categoria: true
            }
        });
    }

    async findById(id: number): Promise<Produto | null> {
        return await this.produtoRepository.findOne({
            where: { id },
            relations: {
                categoria: true
            }
        });
    }

    async findByNome(nome: string): Promise<Produto[]> {
        return await this.produtoRepository.find({
            where: { nome: ILike(`%${nome}%`) },
            relations: {
                categoria: true
            }
        });
    }

    async create(produto: Produto): Promise<Produto> {
        return await this.produtoRepository.save(produto);
    }

    async update(produto: Produto): Promise<Produto> {
        return await this.produtoRepository.save(produto);
    }

    async delete(id: number): Promise<void> {
        await this.produtoRepository.delete(id);
    }
}