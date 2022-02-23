import { Column, Entity, Index,PrimaryGeneratedColumn } from "typeorm";


@Index(['type', 'name'])
@Entity()
export class EventEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    type: string;

    @Index()
    @Column()
    name: string;

    @Column('json')
    payload: Record<string, any>;

}