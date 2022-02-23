import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { coffee } from "./coffee.entity";


@Entity()
export class flavor{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @ManyToMany(type => coffee, (coffee) => coffee.flavors)
    coffees: coffee[];
}