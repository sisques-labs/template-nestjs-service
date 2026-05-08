import '@sisques-labs/nestjs-kit/registered-enums';

import { SupportModule } from '@/support/support.module';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { MongoModule, TypeOrmModule } from '@sisques-labs/nestjs-kit';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HealthModule } from './health/health.module';
import { KafkaModule } from './kafka/kafka.module';

// Add feature context modules here (e.g. CoreModule importing your-context.module.ts)
const FEATURES = [];
const SUPPORT = [SupportModule];

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env.local', '.env'],
    }),
    TypeOrmModule, // Postgres write side — remove if not using TypeORM
    MongoModule, // MongoDB read side — remove if not using MongoDB
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: false,
      plugins:
        process.env.NODE_ENV === 'production'
          ? []
          : [ApolloServerPluginLandingPageLocalDefault()],
    }),
    HealthModule,
    KafkaModule, // Remove if this service does not use Kafka
    ...FEATURES,
    ...SUPPORT,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
