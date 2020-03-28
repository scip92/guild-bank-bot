import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Role } from "./role";

@Entity()
export class Account extends BaseEntity {
    @PrimaryGeneratedColumn()
    public id: number;

    @Column()
    public discordGuildId: string;

    @Column()
    public classicGuildBankId: string;

    @Column({nullable: true})
    public apiToken?: string;

    @Column()
    public isPublic: boolean;

    @OneToMany(type => Role, role => role.account)
    memberRoles: Role[];

    @Column()
    adminUserId: string;

    public static findByDiscordId(discordId: string) {
        return this.createQueryBuilder("account")
            .where("account.discordGuildId = :discordId", {discordId})
            .getOne();
    }
}