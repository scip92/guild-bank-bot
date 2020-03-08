import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity()
export class User extends BaseEntity {
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

    public static findByDiscordId(discordId: string) {
        return this.createQueryBuilder("user")
            .where("user.discordGuildId = :discordId", { discordId })
            .getOne();
    }
}
