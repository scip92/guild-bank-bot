import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Account } from "./account";

@Entity()
export class Role extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public discordRoleId: string;

    @ManyToOne(type => Account, account => account.officerRoles)
    public account: Account;
}
