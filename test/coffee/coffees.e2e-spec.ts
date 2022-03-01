import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

jest.setTimeout(100000)
describe('[Feature] Coffees - /coffees', () => {
  let app: INestApplication;
  jest.setTimeout(100000)
  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
            CoffeesModule,
            TypeOrmModule.forRootAsync({
                useFactory: () => ({
                type: 'postgres', 
                host: 'localhost',
                port: 5432,
                username: 'postgres',
                password: 'pass123',
                database: 'postgres',
                autoLoadEntities: true,
                synchronize: true
                })
            }),
        ],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it.todo('Create (POST /)');
  it.todo('Get all (GET /)');
  it.todo('Get one (GET /:id)');
  it.todo('Update one (PATCH /:id)');
  it.todo('Delete one (DELETE /:id)');


  afterAll(async () => {
    await app.close();
  });
});
