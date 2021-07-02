import { Controller, Post, UploadedFile } from '@nestjs/common';
import { context, trace } from '@opentelemetry/api';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('/start')
  getHello(
    @UploadedFile('file') file: any,
  ): string {
    console.log('Should log active span');
    const span = trace.getSpan(context.active());
    console.dir(span);
    span?.end();
    return this.appService.getHello();
  }
}
