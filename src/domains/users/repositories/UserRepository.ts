import { Repository, getRepository } from "typeorm";
import { IUserRepository } from "@domains/users/interfaces/IUserRepository";
import { ICreateUserDTO } from "@domains/users/dtos/ICreateUserDTO";
import { User } from "@domains/users/entities/User";

export class UserRepository implements IUserRepository {
	private ormRepository: Repository<User>;

	constructor() {
		this.ormRepository = getRepository(User);
	}

	public async create(userData: ICreateUserDTO): Promise<User> {
		const user = this.ormRepository.create(userData);
		await this.ormRepository.save(user);
		return user;
	}

	public async findById(id: string): Promise<User | undefined> {
		return this.ormRepository.findOne(id);
	}

	public async findByEmail(email: string): Promise<User | undefined> {
		return this.ormRepository.findOne({ where: email });
	}

	public async findByName(name: string): Promise<User | undefined> {
		return this.ormRepository.findOne({ where: name });
	}

	public async save(user: User): Promise<User> {
		return this.ormRepository.save(user);
	}
}
