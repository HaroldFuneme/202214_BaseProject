import { Test, TestingModule } from '@nestjs/testing';
import { CiudadEntity } from '../ciudad/ciudad.entity';
import { Repository } from 'typeorm';
import { CiudadSupermercadoService } from './ciudad-supermercado.service';
import { SupermercadoEntity } from '../supermercado/supermercado.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';
import { CiudadService } from '../ciudad/ciudad.service';
import { SupermercadoService } from '../supermercado/supermercado.service';

describe('CiudadSupermercadoService', () => {
  let service: CiudadSupermercadoService;
  let ciudadRepository: Repository<CiudadEntity>;
  let supermercadoRepository: Repository<SupermercadoEntity>;
  let ciudades: CiudadEntity[];
  let supermercados: SupermercadoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CiudadSupermercadoService,
        CiudadService,
        SupermercadoService,
      ],
      imports: [...TypeOrmTestingConfig()],
    }).compile();

    service = module.get<CiudadSupermercadoService>(CiudadSupermercadoService);
    ciudadRepository = module.get<Repository<CiudadEntity>>(
      getRepositoryToken(CiudadEntity),
    );
    supermercadoRepository = module.get<Repository<SupermercadoEntity>>(
      getRepositoryToken(SupermercadoEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    ciudadRepository.clear();
    supermercadoRepository.clear();

    supermercados = [];
    ciudades = [];

    for (let i = 0; i <= 5; i++) {
      const supermercado: SupermercadoEntity =
        await supermercadoRepository.save({
          nombre: faker.lorem.words(),
          longitud: faker.datatype.number(),
          latitud: faker.datatype.number(),
          paginaWeb: faker.datatype.number(),
          ciudades: [...ciudades],
        });
      const ciudad: CiudadEntity = await ciudadRepository.save({
        nombre: faker.lorem.words(),
        pais: faker.lorem.sentence(),
        numHabitantes: faker.datatype.number(),
        supermercados: [...supermercados],
      });

      ciudades.push(ciudad);
      supermercados.push(supermercado);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addSupermarketToCity should add an supermercado to a ciudad', async () => {
    const supermercado: SupermercadoEntity = await supermercadoRepository.save({
      nombre: faker.lorem.words(),
      longitud: faker.datatype.number(),
      latitud: faker.datatype.number(),
      paginaWeb: faker.datatype.number(),
      ciudades: [],
    });

    const ciudad: CiudadEntity = await ciudadRepository.save({
      nombre: faker.lorem.words(),
      pais: faker.lorem.sentence(),
      numHabitantes: faker.datatype.number(),
      supermercados: [],
    });

    const result: CiudadEntity = await service.addSupermarketToCity(
      supermercado.id,
      ciudad.id,
    );
    expect(result.supermercados.length).toBe(1);
    expect(result.supermercados[0]).not.toBeNull();
    expect(result.supermercados[0].nombre).toBe(supermercado.nombre);
    expect(result.supermercados[0].latitud).toBe(supermercado.latitud);
    expect(result.supermercados[0].longitud).toBe(supermercado.longitud);
    expect(result.supermercados[0].paginaWeb).toBe(supermercado.paginaWeb);
  });

  it('addSupermarketToCity should thrown exception for an invalid supermercado', async () => {
    const ciudad: CiudadEntity = await ciudadRepository.save({
      nombre: faker.lorem.words(),
      pais: faker.lorem.sentence(),
      numHabitantes: faker.datatype.number(),
      supermercados: [],
    });

    await expect(() =>
      service.addSupermarketToCity(ciudad.id, '0'),
    ).rejects.toHaveProperty(
      'message',
      'The supermercado with the given id was not found',
    );
  });

  it('addSupermarketToCity should throw an exception for an invalid ciudad', async () => {
    const supermercado: SupermercadoEntity = await supermercadoRepository.save({
      nombre: faker.lorem.words(),
      longitud: faker.datatype.number(),
      latitud: faker.datatype.number(),
      paginaWeb: faker.datatype.number(),
      ciudades: [],
    });

    await expect(() =>
      service.addSupermarketToCity('0', supermercado.id),
    ).rejects.toHaveProperty(
      'message',
      'The supermercado with the given id was not found',
    );
  });

  it('findSupermarketsFromCity should return supermercados by ciudad', async () => {
    const supermercados: SupermercadoEntity[] =
      await service.findSupermarketsFromCity(ciudades[0].id);
    expect(supermercados.length).toBe(5);
  });

  it('findSupermarketsFromCity should throw an exception for an invalid ciudad', async () => {
    await expect(() =>
      service.findSupermarketsFromCity('0'),
    ).rejects.toHaveProperty(
      'message',
      'The ciudad with the given id was not found',
    );
  });

  it('findSupermarketFromCity should return an supermercado by ciudad', async () => {
    const ciudad: CiudadEntity = await ciudadRepository.save({
      nombre: faker.lorem.words(),
      pais: faker.lorem.sentence(),
      numHabitantes: faker.datatype.number(),
      supermercados: [],
    });
    const supermercado: SupermercadoEntity = await supermercadoRepository.save({
      nombre: faker.lorem.words(),
      longitud: faker.datatype.number(),
      latitud: faker.datatype.number(),
      paginaWeb: faker.datatype.number(),
      ciudades: [ciudad],
    });

    const resultSuper: CiudadEntity = await service.findSupermarketFromCity(
      supermercado.id,
      ciudad.id,
    );
    expect(resultSuper.supermercados.length).toBe(1);
    expect(resultSuper.supermercados[0].id).toBe(supermercado.id);
    expect(resultSuper.supermercados[0].latitud).toBe(supermercado.latitud);
    expect(resultSuper.supermercados[0].longitud).toBe(supermercado.longitud);
    expect(resultSuper.supermercados[0].nombre).toBe(supermercado.nombre);
    expect(resultSuper.supermercados[0].paginaWeb).toBe(supermercado.paginaWeb);
  });

  it('updateSupermarketsFromCity should update supermercado from ciudad', async () => {
    const supermercado: SupermercadoEntity = await supermercadoRepository.save({
      nombre: 'faker.lorem.words()',
      longitud: 123,
      latitud: 123,
      paginaWeb: 456,
      ciudades: [...ciudades],
    });
    const result = await service.updateSupermarketsFromCity(
      ciudades[0].id,
      supermercados[1].id,
      supermercado,
    );
    expect(result).toBe(supermercado);
    expect(result.ciudades).toBe(supermercado.ciudades);
    expect(result.latitud).toBe(supermercado.latitud);
    expect(result.longitud).toBe(supermercado.longitud);
    expect(result.nombre).toBe(supermercado.nombre);
    expect(result.paginaWeb).toBe(supermercado.paginaWeb);
  });

  it('deletesupermercadoTociudad should remove an supermercado from a ciudad', async () => {
    const supermercado: SupermercadoEntity = supermercados[1];
    console.log(supermercado);
    console.log(ciudades[0]);

    await service.deleteSupermarketFromCity(supermercado.id, ciudades[0].id);

    const storedciudad: CiudadEntity = await ciudadRepository.findOne({
      where: { id: ciudades[0].id },
      relations: ['supermercados'],
    });
    const deletedsupermercado: SupermercadoEntity =
      storedciudad.supermercados.find((a) => a.id === supermercado.id);

    expect(deletedsupermercado).toBeUndefined();
  });

  it('deleteSupermarketFromCity should remove an supermercado from a ciudad', async () => {
    const supermercado: SupermercadoEntity = supermercados[0];
    await expect(() =>
      service.deleteSupermarketFromCity('0', supermercado.id),
    ).rejects.toHaveProperty(
      'message',
      'The supermercado with the given id was not found',
    );
  });
});
