import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CiudadEntity } from '../ciudad/ciudad.entity';

export class SupermercadoDto {
  @IsString()
  @IsNotEmpty()
  readonly nombre: string;

  @IsNotEmpty()
  readonly longitud: number;

  @IsNotEmpty()
  readonly latitud: number;

  @IsNumber()
  @IsNotEmpty()
  readonly paginaWeb: number;

  readonly ciudades: CiudadEntity[];
}
