import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { coffee } from 'src/coffee/entities/coffee.entity';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(coffee)
        private readonly coffeeRepository: Repository<coffee>,
    ){}

    findAll(){
        return this.coffeeRepository.find();
    }

    async findOne(id: string){
        const coffee = await this.coffeeRepository.findOne(id);
        if(!coffee)
        {
            throw new NotFoundException(`Coffee #${id} not found`)
        }
        return coffee;
    }

    create(createCofeeDTO: CreateCoffeeDto){
        const coffee = this.coffeeRepository.create(createCofeeDTO);
        return this.coffeeRepository.save(coffee);
    }

    async update(id:string, updateeCofeeDTO: UpdateCoffeeDto){
        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateeCofeeDTO
        });
        if(!coffee){
            throw new NotFoundException(`Coffee #${id} not found`)
        }
        return this.coffeeRepository.save(coffee);
    }

    async remove(id:string){
        const coffee = await this.coffeeRepository.findOne(id);
        
        return this.coffeeRepository.remove(coffee);
    }

}
