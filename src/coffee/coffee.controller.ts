import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { CoffeesService } from 'src/coffees/coffees.service';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/coffees/dto/update-coffee.dto';

@Controller('coffee')
export class CoffeeController {
    constructor(
        private readonly coffeeService: CoffeesService
        ){}

    @Get()
    findAll (){
        //@Query() paginationQuery const {limit, offset} = paginationQuery; 
        return this.coffeeService.findAll();
    }

    @Get(':id')
    findOne (@Param('id') id: number ){
        
        return this.coffeeService.findOne('' +id);
    }

    @Post()
    create (@Body() createCoffeeDTO: CreateCoffeeDto ){
        //console.log(createCoffeeDTO instanceof CreateCoffeeDto);
        
        return this.coffeeService.create(createCoffeeDTO);
    }

    @Patch(':id')
    update (@Param('id') id: string, @Body() updateCoffeeDTO: UpdateCoffeeDto ){
        return this.coffeeService.update(id, updateCoffeeDTO);
    }

    @Delete(':id')
    remove (@Param('id') id: string ){
        return this.coffeeService.remove(id);
    }
}
