import { IsNotEmpty, IsString } from 'class-validator';
import { SupermercadoEntity } from 'src/supermercado/supermercado.entity';
export class CiudadDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  readonly pais: string;

  @IsString()
  @IsNotEmpty()
  readonly numeroHabitantes: string;

  readonly supermercados: SupermercadoEntity[];
}
