import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { coffee } from 'src/coffee/entities/coffee.entity';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { InjectModel, InjectConnection } from '@nestjs/mongoose';
import { Model, Connection } from 'mongoose';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { EventEnt } from 'src/event/entities/event.entity';


@Injectable()
export class CoffeesService {
    constructor(
        @InjectModel(coffee.name) private readonly coffeeModel: Model<coffee>,
        @InjectConnection() private readonly connection: Connection,
        @InjectModel(EventEnt.name) private readonly eventeModel: Model<EventEnt>,
    ){}

    findAll(paginationQuery: PaginationQueryDto){
        const {limit, offset} = paginationQuery; 
        return this.coffeeModel.find().skip(offset).limit(limit).exec();
    }

    async findOne(id: string){
        const coffee = await this.coffeeModel.findOne({_id: id}).exec();
        if(!coffee)
        {
            throw new NotFoundException(`Coffee #${id} not found`)
        }
        return coffee;
    }

    create(createCofeeDTO: CreateCoffeeDto){
        const coffee = new this.coffeeModel(createCofeeDTO);
        return coffee.save();
    }

    async update(id:string, updateeCofeeDTO: UpdateCoffeeDto){
        const existingCofee = await this.coffeeModel
            .findOneAndUpdate({_id: id}, { $set: updateeCofeeDTO}, {new: true}).exec();
        if(!existingCofee){
            throw new NotFoundException(`Coffee #${id} not found`)
        }
        return existingCofee;
        
    }

    async remove(id:string){
        const coffee = await this.findOne(id);
        return coffee.remove();
    }

    async recommendCoffee(coffee:coffee){
        const session = await this.connection.startSession();
        session.startTransaction();

        try{
            coffee.recommendations++;
            const recommendEvent = new this.eventeModel({
                name: 'recommend_coffee',
                type: 'coffee',
                payload: {coffeeId : coffee.id}
            });

            await recommendEvent.save({session});
            await coffee.save({session});

            await session.commitTransaction();
        } catch (err){
            await session.abortTransaction();
        } finally{
            await session.endSession();
        }
    }

}
