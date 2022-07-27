import { Exclude } from "class-transformer";
import {
	Column,
	CreateDateColumn,
	Entity,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
	OneToOne,
	JoinColumn,
} from "typeorm";
import { User } from "@domains/users/entities/User";

@Entity("admin")
export class Admin {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Exclude()
	@Column({ name: "user_id", type: "uuid" })
	userId: string;

	@OneToOne(() => User, { cascade: ["insert", "update" ]})
	@JoinColumn({ name: "user_id" })
	user: User;

	@CreateDateColumn({ type: "timestamp without time zone" })
	created_at: Date;

	@UpdateDateColumn({ type: "timestamp without time zone" })
	updated_at: Date;
}
