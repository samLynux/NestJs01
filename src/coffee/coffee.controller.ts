import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('coffee')
export class CoffeeController {

    @Get('flavors')
    findAll (){
        return "all";
    }

    @Get(':id')
    findOne (@Param('id') id: string ){
        return `returns ${id}`;
    }

    @Post()
    create (@Body('name') body ){
        return body;
    }
}
