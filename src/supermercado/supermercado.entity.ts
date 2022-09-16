import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
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
  @JoinTable({
    name: 'ciudad_ciudad_supermercado_id',
    joinColumn: {
      name: 'ciudades',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'supermercados',
      referencedColumnName: 'id',
    },
  })
  ciudades: CiudadEntity[];
}
