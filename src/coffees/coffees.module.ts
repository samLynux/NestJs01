import { Module } from '@nestjs/common';
import { CoffeeController } from 'src/coffee/coffee.controller';
import { CoffeesService } from './coffees.service';
import { MongooseModule } from '@nestjs/mongoose';
import { coffee, CoffeeSchema } from 'src/coffee/entities/coffee.entity';
import { EventEnt, EventSchema } from 'src/event/entities/event.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: coffee.name,
                schema: CoffeeSchema
            },
            {
                name: EventEnt.name,
                schema: EventSchema
            },
        ])
    ],
    controllers:[
        CoffeeController
    ],
    providers: [
        CoffeesService
    ]
})
export class CoffeesModule {}
