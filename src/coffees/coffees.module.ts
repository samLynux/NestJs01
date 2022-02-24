import { Module, Scope } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { CoffeeController } from 'src/coffee/coffee.controller';
import { coffee } from 'src/coffee/entities/coffee.entity';
import { flavor } from 'src/coffee/entities/flavor.entity';
import { EventEntity } from 'src/events/entities/event-entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { CoffeesService } from './coffees.service';


@Module({
    imports: [
        TypeOrmModule.forFeature([coffee, flavor, EventEntity])
    ],
    controllers:[
        CoffeeController
    ],
    providers: [
        CoffeesService,
        {
            provide:COFFEE_BRANDS, 
            useFactory: async () => ['buddy brew', 'nescafe'],
            scope: Scope.TRANSIENT,
        }
    ],
    exports: [CoffeesService],
})
export class CoffeesModule {}
