import { injectable, inject } from "tsyringe";
import { User } from "@domains/users/entities/User";
import { IUserRepository } from "@domains/users/interfaces/IUserRepository";
import { IHashProvider } from "@domains/users/providers/HashProvider/interfaces/IHashProvider";

interface IRequest {
	name: string;
	email: string;
	password: string;
}

@injectable()
export class CreateUserService {
	constructor(
		@inject("UserRepository")
		private userRepository: IUserRepository,

		@inject("HashProvider")
		private hashProvider: IHashProvider
	) {}

	public async execute({
		name,
		email,
		password
	}: IRequest): Promise<User> {
		if (await this.userRepository.findByEmail(email))
			throw new Error("An user with that e-mail already exists!");

		const user = await this.userRepository.create({
			name,
			email,
			password: await this.hashProvider.generateHash(password)
		});

		return user;
	}
}
