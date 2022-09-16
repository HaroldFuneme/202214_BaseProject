import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  BusinessLogicException,
  BusinessError,
} from '../shared/errors/business-errors';
import { Repository } from 'typeorm';
import { SupermercadoEntity } from './supermercado.entity';

@Injectable()
export class SupermercadoService {
  paisAceptado = ['Argentina', 'Ecuador', 'Paraguay'];

  constructor(
    @InjectRepository(SupermercadoEntity)
    private readonly supermercadoEntity: Repository<SupermercadoEntity>,
  ) {}

  async findAll(): Promise<SupermercadoEntity[]> {
    return await this.supermercadoEntity.find({ relations: ['ciudades'] });
  }

  async findOne(id: string): Promise<SupermercadoEntity> {
    const supermercado: SupermercadoEntity =
      await this.supermercadoEntity.findOne({
        where: { id },
        relations: ['ciudades'],
      });
    if (!supermercado)
      throw new BusinessLogicException(
        'The supermercado with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    return supermercado;
  }

  async create(supermercado: SupermercadoEntity): Promise<SupermercadoEntity> {
    if (supermercado.nombre.length > 10)
      throw new BusinessLogicException(
        'The supermercado with the given nombre it is not permitted',
        BusinessError.NOT_FOUND,
      );
    return await this.supermercadoEntity.save(supermercado);
  }

  async update(
    id: string,
    supermercado: SupermercadoEntity,
  ): Promise<SupermercadoEntity> {
    const persistedsupermercado: SupermercadoEntity =
      await this.supermercadoEntity.findOne({
        where: { id },
      });
    if (!persistedsupermercado)
      throw new BusinessLogicException(
        'The supermercado with the given id was not found',
        BusinessError.NOT_FOUND,
      );
    if (supermercado.nombre.length > 10)
      throw new BusinessLogicException(
        'The supermercado with the given nombre it is not permitted',
        BusinessError.NOT_FOUND,
      );

    return await this.supermercadoEntity.save(supermercado);
  }

  async delete(id: string) {
    const supermercado: SupermercadoEntity =
      await this.supermercadoEntity.findOne({
        where: { id },
      });
    if (!supermercado)
      throw new BusinessLogicException(
        'The supermercado with the given id was not found',
        BusinessError.NOT_FOUND,
      );

    await this.supermercadoEntity.remove(supermercado);
  }
}
