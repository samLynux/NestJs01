import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class coffee{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    brand: string;

    @Column('json', {nullable: true})
    flavors: string[];
}