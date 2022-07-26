import { Column, CreateDateColumn, Entity, UpdateDateColumn, PrimaryGeneratedColumn } from "typeorm";
import { Exclude, Expose } from "class-transformer";

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

	@CreateDateColumn({ type: "timestamp without time zone" })
	created_at: Date;

	@UpdateDateColumn({ type: "timestamp without time zone" })
	updated_at: Date;
}
