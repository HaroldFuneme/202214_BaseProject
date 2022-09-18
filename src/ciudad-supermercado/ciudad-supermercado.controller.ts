import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
  UseInterceptors,
} from '@nestjs/common';
import { SupermercadoDto } from 'src/supermercado/supermercado.dto';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';
import { CiudadSupermercadoService } from './ciudad-supermercado.service';
import { SupermercadoEntity } from '../supermercado/supermercado.entity';
import { plainToInstance } from 'class-transformer';

@Controller('/cities ')
@UseInterceptors(BusinessErrorsInterceptor)
export class CiudadSupermercadoController {
  constructor(
    private readonly ciudadSupermercadoService: CiudadSupermercadoService,
  ) {}

  @Post(':ciudadId/supermercado/:supermercadoId')
  async addSupermarketToCity(
    @Param('ciudadId') ciudadId: string,
    @Param('supermercadoId') supermercadoId: string,
  ) {
    return await this.ciudadSupermercadoService.addSupermarketToCity(
      supermercadoId,
      ciudadId,
    );
  }

  @Get(':ciudadId/supermercado')
  async findsupermercadoByciudadId(@Param('ciudadId') ciudadId: string) {
    return await this.ciudadSupermercadoService.findSupermarketsFromCity(
      ciudadId,
    );
  }

  @Get(':ciudadId/supermercados/:supermercadoId')
  async findSupermarketFromCity(
    @Param('ciudadId') ciudadId: string,
    @Param('supermercadoId') supermercadoId: string,
  ) {
    return await this.ciudadSupermercadoService.findSupermarketFromCity(
      supermercadoId,
      ciudadId,
    );
  }

  @Put(':ciudadId/supermercados/:supermercadoId')
  async updateSupermarketsFromCity(
    @Body() supermercadosDto: SupermercadoDto,
    @Param('ciudadId') ciudadId: string,
    @Param('supermercadoId') supermercadoId: string,
  ) {
    const supermercados = plainToInstance(SupermercadoEntity, supermercadosDto);
    return await this.ciudadSupermercadoService.updateSupermarketsFromCity(
      ciudadId,
      supermercadoId,
      supermercados,
    );
  }

  @Delete(':ciudadId/artworks/:supermercadoId')
  @HttpCode(204)
  async deleteArtworkMuseum(
    @Param('ciudadId') ciudadId: string,
    @Param('supermercadoId') supermercadoId: string,
  ) {
    return await this.ciudadSupermercadoService.deleteSupermarketFromCity(
      ciudadId,
      supermercadoId,
    );
  }
}
