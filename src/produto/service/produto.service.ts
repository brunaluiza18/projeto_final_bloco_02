import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Produto } from '../entities/produto.entity';
import { Categoria } from '../../categoria/entities/categoria.entity';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(Produto)
    private readonly produtoRepository: Repository<Produto>,

    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async findAll(): Promise<Produto[]> {
    return await this.produtoRepository.find({
      relations: ['categoria'],
    });
  }

  async findById(id: number): Promise<Produto | null> {
    return await this.produtoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
  }

  async findByNome(nome: string): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: { nome: ILike(`%${nome}%`) },
      relations: ['categoria'],
    });
  }

  // ⭐ EXTRA – BUSCAR PRODUTOS POR CATEGORIA
  async findByCategoria(categoriaId: number): Promise<Produto[]> {
    return await this.produtoRepository.find({
      where: { categoria: { id: categoriaId } },
      relations: ['categoria'],
    });
  }

  // ⭐ EXTRA – CONTAR PRODUTOS
  async countProdutos(): Promise<number> {
    return await this.produtoRepository.count();
  }

  async create(produto: Produto): Promise<Produto> {
    const categoria = await this.categoriaRepository.findOne({
      where: { id: produto.categoria?.id },
    });

    if (!categoria) {
      throw new BadRequestException('Categoria não encontrada');
    }

    produto.categoria = categoria;
    return await this.produtoRepository.save(produto);
  }

  async update(produto: Produto): Promise<Produto> {
    return await this.produtoRepository.save(produto);
  }

  // ⭐ EXTRA – ATUALIZAR SOMENTE A QUANTIDADE
  async updateQuantidade(id: number, quantidade: number): Promise<Produto> {
    const produto = await this.produtoRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });

    if (!produto) {
      throw new BadRequestException('Produto não encontrado');
    }

    produto.quantidade = quantidade;
    return await this.produtoRepository.save(produto);
  }

  async delete(id: number): Promise<void> {
    await this.produtoRepository.delete(id);
  }
}
