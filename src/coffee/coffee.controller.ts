import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';

@Controller('coffee')
export class CoffeeController {

    @Get()
    findAll (@Query() paginationQuery){
        const {limit, offset} = paginationQuery; 
        return `limit ${limit} offest ${offset}`;
    }

    @Get(':id')
    findOne (@Param('id') id: string ){
        
        return `returns ${id}`;
    }

    @Post()
    create (@Body() body ){
        return body;
    }

    @Patch(':id')
    update (@Param('id') id: string, @Body() body ){
        return `updates ${id}`;
    }

    @Delete(':id')
    remove (@Param('id') id: string ){
        return `removes ${id}`;
    }
}
