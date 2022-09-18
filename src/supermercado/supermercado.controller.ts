import { Controller, UseInterceptors } from '@nestjs/common';
import { BusinessErrorsInterceptor } from '../shared/interceptors/business-errors.interceptor';

@Controller('/supermarkets')
@UseInterceptors(BusinessErrorsInterceptor)
export class SupermercadoController {}
