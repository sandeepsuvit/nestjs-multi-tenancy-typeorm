import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { BaseEntity } from "src/commons/base.entity";

@Entity({name: "player"})
export class PlayerEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({name: "name", type: "varchar", length: 255})
    name: string;
}
