import { Controller, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('/cities/1/supermarkets/4 ')
@UseInterceptors(BusinessErrorsInterceptor)
export class CiudadSupermercadoController {}
