import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CiudadService } from './ciudad.service';
import { CiudadEntity } from './ciudad.entity';
import { CiudadController } from './ciudad.controller';

@Module({
  providers: [CiudadService],
  imports: [TypeOrmModule.forFeature([CiudadEntity])],
  controllers: [CiudadController],
})
export class CiudadModule {}
