import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { coffee } from 'src/coffee/entities/coffee.entity';
import { flavor } from 'src/coffee/entities/flavor.entity';
import { PaginationQueryDTO } from 'src/common/dto/pagination-query.dto';
import { Repository } from 'typeorm';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(coffee)
        private readonly coffeeRepository: Repository<coffee>,
        @InjectRepository(flavor)
        private readonly flavorRepository: Repository<flavor>,
    ){}

    findAll(paginationQuery: PaginationQueryDTO){
        const {limit, offset} = paginationQuery; 
        return this.coffeeRepository.find({
            relations: ["flavors"],
            skip: offset,
            take: limit
        });
    }

    async findOne(id: string){
        const coffee = await this.coffeeRepository.findOne(id, {
            relations: ["flavors"]
        });
        if(!coffee)
        {
            throw new NotFoundException(`Coffee #${id} not found`)
        }
        return coffee;
    }

    async create(createCofeeDTO: CreateCoffeeDto){
        const flavors = await Promise.all(
            createCofeeDTO.flavors.map(name => this.preloadFlavorByName(name))
        )

        const coffee = this.coffeeRepository.create({
            ...createCofeeDTO,
            flavors});
        return this.coffeeRepository.save(coffee);
    }

    async update(id:string, updateeCofeeDTO: UpdateCoffeeDto){
        const flavors = updateeCofeeDTO && (await Promise.all(
            updateeCofeeDTO.flavors.map(name => this.preloadFlavorByName(name))
        ))


        
        const coffee = await this.coffeeRepository.preload({
            id: +id,
            ...updateeCofeeDTO,
            flavors
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

    private async preloadFlavorByName(name:string): Promise<flavor>{
        const existingCoffeeFlavor = await this.flavorRepository.findOne({name});
        if(existingCoffeeFlavor){
            return existingCoffeeFlavor;
        }
        return this.flavorRepository.create({name});
    } 

}
