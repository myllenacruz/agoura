import { User } from "@domains/users/entities/User";
import { ICreateUserDTO } from "@domains/users/dtos/ICreateUserDTO";

export interface IUserRepository {
	create(user: ICreateUserDTO): Promise<User>;
	findById(id: string): Promise<User | undefined>;
	findByEmail(email: string): Promise<User | undefined>;
	findByName(name: string): Promise<User | undefined>;
	save(user: User): Promise<User>;
}
