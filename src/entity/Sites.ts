import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class Sites {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    domain: string

    @Column()
    keyword: string
}