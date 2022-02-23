
import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";
import { flavor } from "./flavor.entity";


@Entity()
export class coffee{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({nullable: true})
    description: string;

    @Column()
    brand: string;

    @Column({default: 0})
    recommendations: number;

    @JoinTable()
    @ManyToMany(
        type => flavor,
        (flavor) => flavor.coffees,
        {
            cascade: true
        })
    flavors: flavor[];
}