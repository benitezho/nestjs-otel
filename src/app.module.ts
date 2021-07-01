import { Module } from '@nestjs/common';
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
export class AppModule {
}
