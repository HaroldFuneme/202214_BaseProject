import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CiudadEntity } from '../ciudad/ciudad.entity';

export class CiudadSupermercadoDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsNumber()
  @IsNotEmpty()
  readonly longitud: number;

  @IsNumber()
  @IsNotEmpty()
  readonly latitud: number;

  @IsNumber()
  @IsNotEmpty()
  readonly paginaWeb: number;

  readonly ciudades: CiudadEntity[];
}
