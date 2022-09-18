import { Test, TestingModule } from '@nestjs/testing';
import { SupermercadoService } from './supermercado.service';
import { SupermercadoEntity } from './supermercado.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';

describe('SupermercadoService', () => {
  let service: SupermercadoService;
  let repository: Repository<SupermercadoEntity>;
  let supermercadoList: SupermercadoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupermercadoService],
      imports: [...TypeOrmTestingConfig()],
    }).compile();

    service = module.get<SupermercadoService>(SupermercadoService);
    repository = module.get<Repository<SupermercadoEntity>>(
      getRepositoryToken(SupermercadoEntity),
    );

    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  const seedDatabase = async () => {
    repository.clear();
    supermercadoList = [];
    for (let i = 0; i < 5; i++) {
      const supermercado: SupermercadoEntity = await repository.save({
        nombre: faker.lorem.words(),
        longitud: faker.datatype.number(),
        latitud: faker.datatype.number(),
        paginaWeb: faker.datatype.number(),
        ciudades: [],
      });
      supermercadoList.push(supermercado);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all supermercado', async () => {
    const supermercado: SupermercadoEntity[] = await service.findAll();
    expect(supermercado).not.toBeNull();
    expect(supermercado).toHaveLength(supermercadoList.length);
  });

  it('findOne should return a supermercado by id', async () => {
    const storedsupermercado: SupermercadoEntity = supermercadoList[0];
    const supermercado: SupermercadoEntity = await service.findOne(
      storedsupermercado.id,
    );
    expect(supermercado).not.toBeNull();
    expect(supermercado.nombre).toEqual(storedsupermercado.nombre);
    expect(supermercado.latitud).toEqual(storedsupermercado.latitud);
    expect(supermercado.longitud).toEqual(storedsupermercado.longitud);
    expect(supermercado.paginaWeb).toEqual(storedsupermercado.paginaWeb);
  });

  it('findOne should throw an exception for an invalid supermercado', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The supermercado with the given id was not found',
    );
  });

  it('create should return a new supermercado with nombre permitted', async () => {
    const supermercado: SupermercadoEntity = {
      id: '',
      nombre: 'name',
      longitud: faker.datatype.number(),
      latitud: faker.datatype.number(),
      paginaWeb: faker.datatype.number(),
      ciudades: [],
    };

    const newsupermercado: SupermercadoEntity = await service.create(
      supermercado,
    );
    expect(newsupermercado).not.toBeNull();

    const storedsupermercado: SupermercadoEntity = await repository.findOne({
      where: { id: newsupermercado.id },
    });
    expect(supermercado).not.toBeNull();
    expect(supermercado.nombre).toEqual(storedsupermercado.nombre);
    expect(supermercado.latitud).toEqual(storedsupermercado.latitud);
    expect(supermercado.longitud).toEqual(storedsupermercado.longitud);
    expect(supermercado.paginaWeb).toEqual(storedsupermercado.paginaWeb);
  });

  it('create should throw an exception for an invalid nombre -> nombre NOT permitted', async () => {
    const supermercado: SupermercadoEntity = {
      id: '',
      nombre: 'name not permitted',
      longitud: faker.datatype.number(),
      latitud: faker.datatype.number(),
      paginaWeb: faker.datatype.number(),
      ciudades: [],
    };

    await expect(() => service.create(supermercado)).rejects.toHaveProperty(
      'message',
      'The supermercado with the given nombre it is not permitted',
    );
  });

  it('update should modify a supermercado', async () => {
    const supermercado: SupermercadoEntity = supermercadoList[0];
    supermercado.nombre = 'Nuevo';
    supermercado.longitud = 33.3;
    supermercado.latitud = 4.8;
    supermercado.paginaWeb = 10;
    const updatedsupermercado: SupermercadoEntity = await service.update(
      supermercado.id,
      supermercado,
    );
    expect(updatedsupermercado).not.toBeNull();
    const storedsupermercado: SupermercadoEntity = await repository.findOne({
      where: { id: supermercado.id },
    });
    expect(supermercado).not.toBeNull();
    expect(supermercado.nombre).toEqual(storedsupermercado.nombre);
    expect(supermercado.latitud).toEqual(storedsupermercado.latitud);
    expect(supermercado.longitud).toEqual(storedsupermercado.longitud);
    expect(supermercado.paginaWeb).toEqual(storedsupermercado.paginaWeb);
  });

  it('update should throw an exception for an invalid supermercado', async () => {
    let supermercado: SupermercadoEntity = supermercadoList[0];
    supermercado = {
      ...supermercado,
      nombre: 'name ',
      longitud: faker.datatype.number(),
      latitud: faker.datatype.number(),
      paginaWeb: faker.datatype.number(),
      ciudades: [],
    };
    await expect(() =>
      service.update('0', supermercado),
    ).rejects.toHaveProperty(
      'message',
      'The supermercado with the given id was not found',
    );
  });

  it('delete should remove a supermercado', async () => {
    const supermercado: SupermercadoEntity = supermercadoList[0];
    await service.delete(supermercado.id);
    const deletedsupermercado: SupermercadoEntity = await repository.findOne({
      where: { id: supermercado.id },
    });
    expect(deletedsupermercado).toBeNull();
  });

  it('delete should throw an exception for an invalid supermercado', async () => {
    const supermercado: SupermercadoEntity = supermercadoList[0];
    await service.delete(supermercado.id);
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'message',
      'The supermercado with the given id was not found',
    );
  });
});
