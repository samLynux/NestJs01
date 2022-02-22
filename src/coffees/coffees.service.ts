import { Injectable } from '@nestjs/common';
import { coffee } from 'src/coffee/entities/coffee.entity';

@Injectable()
export class CoffeesService {
    private coffees: coffee[] = [
        {
            id:1,
            name: "kopiko",
            brand: "indocafe",
            flavors: ["choco", "vanilla"]
        }
    ];

    findAll(){
        return this.coffees;
    }

    findOne(id: string){
        return this.coffees.find(item => item.id === +id);
    }

    create(createCofeeDTO: any){
        return this.coffees.push(createCofeeDTO);
    }

    update(id:string, updateeCofeeDTO: any){
        const existingCofee = this.findOne(id);
        if(existingCofee){

        }
        
    }

    remove(id:string){
        const coffeeIndex = this.coffees.findIndex(item => item.id === +id);
        if(coffeeIndex >= 0){
            this.coffees.splice(coffeeIndex,1);
        }
        
    }

}
