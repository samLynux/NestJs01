import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from "typeorm";



@Entity()
export class Event{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Column()
    name: string;

    @Column('json')
    payload: Record<string, any>;

}