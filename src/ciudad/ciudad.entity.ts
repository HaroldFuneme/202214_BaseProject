import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
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
  supermercados: SupermercadoEntity[];
}
