import { v4 as uuidv4 } from "uuid";
import { IUserRepository } from "@domains/users/interfaces/IUserRepository";
import { ICreateUserDTO } from "@domains/users/dtos/ICreateUserDTO";
import { User } from "@domains/users/entities/User";

export class FakeUserRepository implements IUserRepository {
	private user: User[] = [];

	public async create(userData: ICreateUserDTO): Promise<User> {
		const user = Object.assign(new User(), {
			id: uuidv4(),
			...userData
		});

		this.user.push(user);

		return user;
	}

	public async findById(id: string): Promise<User | undefined> {
		return this.user.find(user => user.id == id);
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		return this.user.find(user => user.email === email);
	}

	public async findByName(name: string): Promise<User | undefined> {
		return this.user.find(user => user.name.toLowerCase() === name.toLocaleLowerCase());
	}

	public async save(user: User): Promise<User> {
		const idx = this.user.findIndex(usr => usr.id === user.id);
		this.user[idx] = user;

		return user;
	}
}
