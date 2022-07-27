import { User } from "@domains/users/entities/User";
import { IUserRepository } from "@domains/users/interfaces/IUserRepository";
import { inject, injectable } from "tsyringe";
import { instanceToInstance } from "class-transformer";

@injectable()
export class ShowProfileService {
	constructor(
		@inject("UserRepository")
		private userRepository: IUserRepository,
	) {}

	public async execute(userId: string): Promise<User> {
		const user = await this.userRepository.findById(userId);

		if (!user)
			throw new Error("User not found!");

		return instanceToInstance(user);
	}
}

