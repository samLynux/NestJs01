import { HttpException, HttpStatus, Inject, Injectable, NotFoundException, Scope } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { coffee } from 'src/coffee/entities/coffee.entity';
import { flavor } from 'src/coffee/entities/flavor.entity';
import { PaginationQueryDTO } from 'src/common/dto/pagination-query.dto';
import { EventEntity } from 'src/events/entities/event-entity';
import { Connection, Repository } from 'typeorm';
import { COFFEE_BRANDS } from './coffees.constants';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

@Injectable()
export class CoffeesService {
    constructor(
        @InjectRepository(coffee)
        private readonly coffeeRepository: Repository<coffee>,
        @InjectRepository(flavor)
        private readonly flavorRepository: Repository<flavor>,
        private readonly connection: Connection,
        private readonly configService: ConfigService,

    ){
        const databaseHost = this.configService.get('database.host', 'localhost');
        console.log(databaseHost);
        
    }

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

    async recommendCoffee(Coffee: coffee){
        const queryRunner = this.connection.createQueryRunner();

        await queryRunner.connect();
        await queryRunner.startTransaction();
        try{
            Coffee.recommendations++;

            const recommendEvent = new EventEntity();
            recommendEvent.name = 'recommend_coffee';
            recommendEvent.type = 'coffee';
            recommendEvent.payload = {coffeeId: Coffee.id};

            await queryRunner.manager.save(Coffee);
            await queryRunner.manager.save(recommendEvent);

            await queryRunner.commitTransaction();
        }catch(err){
            await queryRunner.rollbackTransaction();
        }finally{
            await queryRunner.release();
        }
    }
}
