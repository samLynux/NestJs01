import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto';

jest.setTimeout(100000)
describe('[Feature] Coffees - /coffees', () => {
  let app: INestApplication;
  const coffee = {
      name: 'name-test',
      brand: 'brand-test',
      flavors: ['flav-test-1','flav-test-2'],
  };
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
    app.useGlobalPipes(new ValidationPipe(
        {
          whitelist: true,
          transform:true,
          forbidNonWhitelisted:true,
          transformOptions: {
            enableImplicitConversion:true,
          }
        }
      ));
    await app.init();
  });

  it('create (POST /)', () => {
    return request(app.getHttpServer())
    .post('/coffee').send(coffee as CreateCoffeeDto).expect(HttpStatus.CREATED)
    // .then(({ body }) => {
    //     const expectedCoffee = jasmine.objectContaining({
    //         ...coffee,
    //         flavors: jasmine.arrayContaining(
    //             coffee.flavors.map(name => jasmine.objectContaining({name})),
    //         )
    //     });
    //     expect(body).toEqual(expectedCoffee);
    // });
  });



  it.todo('Get all (GET /)');
  it.todo('Get one (GET /:id)');
  it.todo('Update one (PATCH /:id)');
  it.todo('Delete one (DELETE /:id)');


  afterAll(async () => {
    await app.close();
  });
});
