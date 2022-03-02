import { Module } from '@nestjs/common';
import { CoffeeController } from 'src/coffee/coffee.controller';
import { CoffeesService } from './coffees.service';
import { MongooseModule } from '@nestjs/mongoose';
import { coffee, CoffeeSchema } from 'src/coffee/entities/coffee.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: coffee.name,
                schema: CoffeeSchema
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
