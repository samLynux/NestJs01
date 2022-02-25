import { Body, Controller, Delete, Get, Param, Patch, Post, Query, SetMetadata } from '@nestjs/common';
import { resolve } from 'path/posix';
import { CoffeesService } from 'src/coffees/coffees.service';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto';
import { UpdateCoffeeDto } from 'src/coffees/dto/update-coffee.dto';
import { Public } from 'src/common/decorators/public-decorator';
import { PaginationQueryDTO } from 'src/common/dto/pagination-query.dto';

@Controller('coffee')
export class CoffeeController {
    constructor(
        private readonly coffeeService: CoffeesService
        ){}

    @Public()
    @Get()
    async findAll (@Query() paginationQuery: PaginationQueryDTO){
        await new Promise(resolve => setTimeout(resolve, 5000) )
        return this.coffeeService.findAll(paginationQuery);
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
