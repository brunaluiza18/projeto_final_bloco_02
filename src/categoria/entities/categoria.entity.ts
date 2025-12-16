import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Produto } from '../../produto/entities/produto.entity';


@Entity()
export class Categoria {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  tipo: string;

  @Column()
  descricao: string;
    produto: any;

@OneToMany(() => Produto, (produto) => produto.categoria)
  produtos: Produto[];
  
}