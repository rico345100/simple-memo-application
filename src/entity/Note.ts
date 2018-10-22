import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Note {
    @PrimaryGeneratedColumn()
    id:number;

    @Column({
        length: 20
    })
    title:string;

    @Column()
    text:string;

    @Column({
        type: 'date',
        default: () => 'CURRENT_TIMESTAMP'
    })
    createdAt:string;

    @Column({
        type: 'date',
        default: () => 'CURRENT_TIMESTAMP'
    })
    updatedAt:string;
}
