import { Module } from '@nestjs/common';
import { ValidationPipe } from '@nestjs/common';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { MongoModule, TypeOrmModule } from '@sisques-labs/nestjs-kit';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { KafkaModule } from '../src/kafka/kafka.module';

@Module({})
class MockInfraModule {}

describe('App (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideModule(TypeOrmModule)
      .useModule(MockInfraModule)
      .overrideModule(MongoModule)
      .useModule(MockInfraModule)
      .overrideModule(KafkaModule)
      .useModule(MockInfraModule)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('health check', () => {
    return request(app.getHttpServer())
      .post('/graphql')
      .send({ query: '{ health }' })
      .expect(200)
      .expect((res) => {
        expect(res.body.data.health).toBe('ok');
      });
  });
});
