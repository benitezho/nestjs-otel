import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { context, trace } from '@opentelemetry/api';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @UseInterceptors(FileInterceptor('field'))
  getHello(): string {
    console.log('Should log active span');
    const span = trace.getSpan(context.active());
    console.dir(span);
    span?.end();
    return this.appService.getHello();
  }
}
