import { inject, injectable } from "tsyringe";
import { IHashProvider } from "@domains/users/providers/HashProvider/interfaces/IHashProvider";
import { Admin } from "@domains/users/entities/Admin";
import { IAdminRepository } from "@domains/users/interfaces/IAdminRepository";
import { IUserRepository } from "@domains/users/interfaces/IUserRepository";

@injectable()
export class CreateFirstAdminService {
	constructor(
		@inject("AdminRepository")
		private adminRepository: IAdminRepository,

		@inject("UserRepository")
		private userRepository: IUserRepository,

		@inject("HashProvider")
		private hashProvider: IHashProvider
	) {}

	public async execute(): Promise<Admin | undefined> {
		const adminExists = await this.adminRepository.hasAdmins();
		const email = process.env.ADMIN_EMAIL;
		const password = process.env.ADMIN_PASSWORD;

		if (!adminExists) {
			if (!email || !password)
				throw new Error("Environment variables for admin email and password are required!");

			const user = await this.userRepository.create({
				name: "Sys Admin",
				email,
				password: await this.hashProvider.generateHash(password)
			});

			const admin = this.adminRepository.create(user.id);

			return admin;
		}

		return undefined;
	}
}
