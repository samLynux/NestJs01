import { IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateCoffeeDto {
    @ApiProperty({description: 'name of coffee'})
    @IsString()
    readonly name: string;

    @ApiProperty({description: 'brand of coffee'})
    @IsString()
    readonly brand: string;

    @ApiProperty({ example: []})
    @IsString({each: true})
    readonly flavors: string[];
}
