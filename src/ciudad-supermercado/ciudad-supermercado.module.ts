import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadEntity } from 'src/ciudad/ciudad.entity';
import { CiudadSupermercadoService } from './ciudad-supermercado.service';
import { SupermercadoEntity } from '../supermercado/supermercado.entity';
import { CiudadSupermercadoController } from './ciudad-supermercado.controller';

@Module({
  providers: [CiudadSupermercadoService],
  imports: [TypeOrmModule.forFeature([CiudadEntity, SupermercadoEntity])],
  controllers: [CiudadSupermercadoController],
})
export class CiudadSupermercadoModule {}
