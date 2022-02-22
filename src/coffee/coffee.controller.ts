import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';

@Controller('coffee')
export class CoffeeController {

    @Get()
    findAll (){
        return "all";
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
