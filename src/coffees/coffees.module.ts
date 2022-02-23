import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeController } from 'src/coffee/coffee.controller';
import { coffee } from 'src/coffee/entities/coffee.entity';
import { CoffeesService } from './coffees.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([coffee])
    ],
    controllers:[
        CoffeeController
    ],
    providers: [
        CoffeesService
    ]
})
export class CoffeesModule {}
