import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SchemaRegistryModule } from '@sisques-labs/nestjs-kit';
import { KafkaProducerService } from './kafka-producer.service';
import { KAFKA_CLIENT_TOKEN } from './kafka.constants';

@Module({
  imports: [
    SchemaRegistryModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        host: configService.get<string>(
          'SCHEMA_REGISTRY_HOST',
          'http://localhost:8081',
        ),
      }),
    }),
    ClientsModule.registerAsync([
      {
        name: KAFKA_CLIENT_TOKEN,
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              clientId: configService.get<string>(
                'KAFKA_CLIENT_ID',
                'your-service',
              ),
              brokers: configService
                .get<string>('KAFKA_BROKERS', '')
                .split(',')
                .map((b) => b.trim())
                .filter(Boolean),
            },
          },
        }),
      },
    ]),
  ],
  providers: [KafkaProducerService],
  exports: [KafkaProducerService],
})
export class KafkaModule {}
