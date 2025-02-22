import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { SupermercadoEntity } from '../supermercado/supermercado.entity';

@Entity()
export class CiudadEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  nombre: string;

  @Column()
  pais: string;

  @Column()
  numHabitantes: number;

  @ManyToMany(() => SupermercadoEntity, (supermercado) => supermercado.ciudades)
  @JoinTable({
    name: 'supermercado_ciudad_id',
    joinColumn: {
      name: 'supermercados_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'ciudades_id',
      referencedColumnName: 'id',
    },
  })
  supermercados: SupermercadoEntity[];
}
