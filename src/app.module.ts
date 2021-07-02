import {MiddlewareConsumer, Module, NestModule, RequestMethod} from '@nestjs/common';
import multer from 'multer';
import {
  BatchSpanProcessor,
  ConsoleSpanExporter,
} from '@opentelemetry/tracing';
import { AsyncLocalStorageContextManager } from '@opentelemetry/context-async-hooks';
import { HttpInstrumentation } from '@opentelemetry/instrumentation-http';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OpenTelemetryModule } from './opentelemetry.module';

@Module({
  imports: [
    OpenTelemetryModule.forRoot({
      nodeSDKConfiguration: {
        spanProcessor: new BatchSpanProcessor(new ConsoleSpanExporter()),
        contextManager: new AsyncLocalStorageContextManager(),
        instrumentations: [new HttpInstrumentation()],
      },
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  private multer = multer({
    storage: multer.memoryStorage(),
  });

  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(this.multer.single('file'))
      .forRoutes({ method: RequestMethod.POST, path: 'start' });
  }
}
