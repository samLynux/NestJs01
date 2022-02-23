
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { flavor } from "./flavor.entity";


@Entity()
export class coffee{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @JoinTable()
    @ManyToMany(
        type => flavor,
        (flavor) => flavor.coffees,
        {
            cascade: true
        })
    flavors: flavor[];
}