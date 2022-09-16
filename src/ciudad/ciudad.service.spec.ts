import { Test, TestingModule } from '@nestjs/testing';
import { CiudadService } from './ciudad.service';
import { CiudadEntity } from './ciudad.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../testing-utils/typeorm-testing-config';
import { faker } from '@faker-js/faker';

describe('CiudadService', () => {
  let service: CiudadService;
  let repository: Repository<CiudadEntity>;
  let ciudadList: CiudadEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CiudadService],
      imports: [...TypeOrmTestingConfig()],
    }).compile();

    service = module.get<CiudadService>(CiudadService);
    repository = module.get<Repository<CiudadEntity>>(
      getRepositoryToken(CiudadEntity),
    );

    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    ciudadList = [];
    for (let i = 0; i < 5; i++) {
      const ciudad: CiudadEntity = await repository.save({
        nombre: faker.lorem.words(),
        pais: faker.lorem.sentence(),
        numHabitantes: faker.datatype.number(),
        supermercados: [],
      });
      ciudadList.push(ciudad);
    }
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findAll should return all ciudad', async () => {
    const ciudad: CiudadEntity[] = await service.findAll();
    expect(ciudad).not.toBeNull();
    expect(ciudad).toHaveLength(ciudadList.length);
  });

  it('findOne should return a ciudad by id', async () => {
    const storedciudad: CiudadEntity = ciudadList[0];
    const ciudad: CiudadEntity = await service.findOne(storedciudad.id);
    expect(ciudad).not.toBeNull();
    expect(ciudad.nombre).toEqual(storedciudad.nombre);
    expect(ciudad.pais).toEqual(storedciudad.pais),
      expect(ciudad.numHabitantes).toEqual(storedciudad.numHabitantes);
  });

  it('findOne should throw an exception for an invalid ciudad', async () => {
    await expect(() => service.findOne('0')).rejects.toHaveProperty(
      'message',
      'The ciudad with the given id was not found',
    );
  });

  it('create should return a new ciudad with pais permitted', async () => {
    const ciudad: CiudadEntity = {
      id: '',
      nombre: faker.lorem.words(),
      pais: 'Argentina',
      numHabitantes: faker.datatype.number(),
      supermercados: [],
    };

    const newciudad: CiudadEntity = await service.create(ciudad);
    expect(newciudad).not.toBeNull();

    const storedciudad: CiudadEntity = await repository.findOne({
      where: { id: newciudad.id },
    });
    expect(ciudad).not.toBeNull();
    expect(ciudad.nombre).toEqual(storedciudad.nombre);
    expect(ciudad.pais).toEqual(storedciudad.pais),
      expect(ciudad.numHabitantes).toEqual(storedciudad.numHabitantes);
  });

  it('create should throw an exception for an invalid pais -> pais NOT permitted', async () => {
    const ciudad: CiudadEntity = {
      id: '',
      nombre: faker.lorem.words(),
      pais: 'Colombia',
      numHabitantes: faker.datatype.number(),
      supermercados: [],
    };

    await expect(() => service.create(ciudad)).rejects.toHaveProperty(
      'message',
      'The ciudad with the given pais it is not permitted',
    );
  });

  it('update should modify a ciudad', async () => {
    const ciudad: CiudadEntity = ciudadList[0];
    ciudad.nombre = 'Nuevo Nombre';
    ciudad.pais = 'Ecuador';
    ciudad.numHabitantes = 4;
    const updatedciudad: CiudadEntity = await service.update(ciudad.id, ciudad);
    expect(updatedciudad).not.toBeNull();
    const storedciudad: CiudadEntity = await repository.findOne({
      where: { id: ciudad.id },
    });
    expect(storedciudad).not.toBeNull();
    expect(storedciudad.nombre).toEqual(ciudad.nombre);
    expect(storedciudad.pais).toEqual(ciudad.pais);
    expect(storedciudad.numHabitantes).toEqual(ciudad.numHabitantes);
  });

  it('update should throw an exception for an invalid ciudad', async () => {
    let ciudad: CiudadEntity = ciudadList[0];
    ciudad = {
      ...ciudad,
      nombre: 'New name',
      pais: 'Ecuador',
      numHabitantes: 3,
      supermercados: [],
    };
    await expect(() => service.update('0', ciudad)).rejects.toHaveProperty(
      'message',
      'The ciudad with the given id was not found',
    );
  });

  it('delete should remove a ciudad', async () => {
    const ciudad: CiudadEntity = ciudadList[0];
    await service.delete(ciudad.id);
    const deletedciudad: CiudadEntity = await repository.findOne({
      where: { id: ciudad.id },
    });
    expect(deletedciudad).toBeNull();
  });

  it('delete should throw an exception for an invalid ciudad', async () => {
    const ciudad: CiudadEntity = ciudadList[0];
    await service.delete(ciudad.id);
    await expect(() => service.delete('0')).rejects.toHaveProperty(
      'message',
      'The ciudad with the given id was not found',
    );
  });
});
