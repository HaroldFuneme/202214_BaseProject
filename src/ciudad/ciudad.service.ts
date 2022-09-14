import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessError,
  BusinessLogicException,
} from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { CiudadEntity } from './ciudad.entity';

@Injectable()
export class CiudadService {
  paisAceptado = ['Argentina', 'Ecuador', 'Paraguay'];

  constructor(
    @InjectRepository(CiudadEntity)
    private readonly ciudadRepository: Repository<CiudadEntity>,
  ) {}

  async findAll(): Promise<CiudadEntity[]> {
    return await this.ciudadRepository.find({ relations: ['supermercado'] });
  }

  async findOne(id: string): Promise<CiudadEntity> {
    const ciudad: CiudadEntity = await this.ciudadRepository.findOne({
      where: { id },
      relations: ['supermercado'],
    });
    if (!ciudad)
      throw new BusinessLogicException(
        'The ciudad with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return ciudad;
  }

  async create(ciudad: CiudadEntity): Promise<CiudadEntity> {
    if (!this.paisAceptado.includes(ciudad.pais))
      throw new BusinessLogicException(
        'The ciudad with the given pais it is not permitted',
        BusinessError.NOT_FOUND,
      );
    return await this.ciudadRepository.save(ciudad);
  }

  async update(id: string, ciudad: CiudadEntity): Promise<CiudadEntity> {
    const persistedciudad: CiudadEntity = await this.ciudadRepository.findOne({
      where: { id },
    });
    if (!persistedciudad)
      throw new BusinessLogicException(
        'The ciudad with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    if (!this.paisAceptado.includes(ciudad.pais))
      throw new BusinessLogicException(
        'The ciudad with the given pais it is not permitted',
        BusinessError.NOT_FOUND,
      );

    return await this.ciudadRepository.save(ciudad);
  }

  async delete(id: string) {
    const ciudad: CiudadEntity = await this.ciudadRepository.findOne({
      where: { id },
    });
    if (!ciudad)
      throw new BusinessLogicException(
        'The ciudad with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    await this.ciudadRepository.remove(ciudad);
  }
}
