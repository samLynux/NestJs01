import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { coffee } from 'src/coffee/entities/coffee.entity';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateCoffeeDto } from './dto/create-coffee.dto';


@Injectable()
export class CoffeesService {


    constructor(
        @InjectModel(coffee.name) private readonly coffeeModel: Model<coffee>
    ){}

    findAll(){
        return this.coffeeModel.find().exec();
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

}
