import { Controller, Get } from '@nestjs/common';

@Controller('coffee')
export class CoffeeController {

    @Get('flavors')
    findAll (){
        return "all";
    }
}
