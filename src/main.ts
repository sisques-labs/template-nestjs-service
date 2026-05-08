import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });
  app.useLogger(app.get(WINSTON_MODULE_NEST_PROVIDER));
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const configService = app.get(ConfigService);
  const brokers = configService
    .get<string>('KAFKA_BROKERS', '')
    .split(',')
    .map((b) => b.trim())
    .filter(Boolean);

  if (brokers.length > 0) {
    app.connectMicroservice<MicroserviceOptions>({
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: configService.get<string>('KAFKA_CLIENT_ID', 'your-service'),
          brokers,
        },
        consumer: {
          groupId: configService.get<string>(
            'KAFKA_CONSUMER_GROUP_ID',
            'your-service-consumer',
          ),
        },
      },
    });
    await app.startAllMicroservices();
  }

  const port = Number.parseInt(configService.get<string>('PORT', '3000'), 10);
  await app.listen(port);
}
bootstrap();
