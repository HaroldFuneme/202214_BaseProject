import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CiudadEntity } from '../ciudad/ciudad.entity';

@Entity()
export class SupermercadoEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  longitud: number;

  @Column()
  latitud: number;

  @Column()
  paginaWeb: number;

  @ManyToMany(() => CiudadEntity, (ciudad) => ciudad.supermercados)
  ciudades: CiudadEntity[];
}
