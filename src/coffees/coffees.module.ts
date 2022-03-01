import { Module, Scope } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeeController } from '../coffee/coffee.controller';
import { coffee } from '../coffee/entities/coffee.entity';
import { flavor } from '../coffee/entities/flavor.entity';
import { EventEntity } from '../events/entities/event-entity';
import { CoffeesService } from './coffees.service';
import coffeesConfig from './config/coffees.config';


@Module({
    imports: [
        TypeOrmModule.forFeature([coffee, flavor, EventEntity]), 
        ConfigModule.forFeature(coffeesConfig)
    ],
    controllers:[
        CoffeeController
    ],
    providers: [
        CoffeesService,
    ],
    exports: [CoffeesService],
})
export class CoffeesModule {}
