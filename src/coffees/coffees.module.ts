import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeController } from 'src/coffee/coffee.controller';
import { coffee } from 'src/coffee/entities/coffee.entity';
import { flavor } from 'src/coffee/entities/flavor.entity';
import { EventEntity } from 'src/events/entities/event-entity';
import { CoffeesService } from './coffees.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([coffee, flavor, EventEntity])
    ],
    controllers:[
        CoffeeController
    ],
    providers: [
        CoffeesService
    ],
    exports: [CoffeesService],
})
export class CoffeesModule {}
