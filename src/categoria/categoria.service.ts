import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './entities/categoria.entity';

@Injectable()
export class CategoriaService {
  constructor(
    @InjectRepository(Categoria)
    private categoriaRepository: Repository<Categoria>,
  ) {}

  findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find();
  }

  async findById(id: number): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOne({ where: { id } });
    if (!categoria) throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);
    return categoria;
  }

  findByTipo(tipo: string): Promise<Categoria[]> {
    return this.categoriaRepository.find({ where: { tipo } });
  }

  create(categoria: Categoria): Promise<Categoria> {
    return this.categoriaRepository.save(categoria);
  }

  async update(categoria: Categoria): Promise<Categoria> {
    const categoriaExistente = await this.categoriaRepository.findOne({ where: { id: categoria.id } });
    if (!categoriaExistente) throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);
    return this.categoriaRepository.save(categoria);
  }

  async delete(id: number): Promise<void> {
    const result = await this.categoriaRepository.delete(id);
    if (result.affected === 0) throw new HttpException('Categoria não encontrada', HttpStatus.NOT_FOUND);
  }
}
