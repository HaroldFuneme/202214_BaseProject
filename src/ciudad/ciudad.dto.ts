import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { SupermercadoEntity } from '../supermercado/supermercado.entity';
export class CiudadDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsString()
  @IsNotEmpty()
  readonly pais: string;

  @IsNumber()
  @IsNotEmpty()
  readonly numHabitantes: number;

  readonly supermercados: SupermercadoEntity[];
}
