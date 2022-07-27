import { Column, CreateDateColumn, Entity, UpdateDateColumn, PrimaryGeneratedColumn, OneToOne } from "typeorm";
import { Exclude } from "class-transformer";
import { Admin } from "./Admin";

@Entity("user")
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column()
	name: string;

	@Column()
	@Exclude()
	phone: string;

	@Exclude()
	@Column({ unique: true })
	email: string;

	@Exclude()
	@Column()
	password: string;

	@OneToOne(() => Admin, admin => admin.user, { eager: true})
	admin?: Admin;

	@CreateDateColumn({ type: "timestamp without time zone" })
	created_at: Date;

	@UpdateDateColumn({ type: "timestamp without time zone" })
	updated_at: Date;
}
