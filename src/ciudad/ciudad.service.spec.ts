import { Test, TestingModule } from '@nestjs/testing';
import { CiudadService } from './ciudad.service';
import { CiudadEntity } from './ciudad.entity';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../testing-utils/typeorm-testing-config';

describe('CiudadService', () => {
  let service: CiudadService;
  let repository: Repository<CiudadEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CiudadService],
      imports: [...TypeOrmTestingConfig()],
    }).compile();

    service = module.get<CiudadService>(CiudadService);
    repository = module.get<Repository<CiudadEntity>>(
      getRepositoryToken(CiudadEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
