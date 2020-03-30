import {BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne} from "typeorm";
import { Account } from "./account";

@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public discordRoleId: string;

    @ManyToOne(type => Account, account => account.offizerRoles)
    public account: Account;
}
