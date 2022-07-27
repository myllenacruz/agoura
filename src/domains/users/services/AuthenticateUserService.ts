import authConfig from "@config/auth";
import { sign } from "jsonwebtoken";
import { inject, injectable } from "tsyringe";
import { IHashProvider } from "@domains/users/providers/HashProvider/interfaces/IHashProvider";
import { User } from "@domains/users/entities/User";
import { IUserRepository } from "../interfaces/IUserRepository";

interface IRequest {
	userAccess: string;
	password: string;
}

interface IResponse {
	user: User;
	accessToken: string;
	refreshToken: string;
}

@injectable()
export class AuthenticateUserService {
	constructor(
		@inject("UserRepository")
		private userRepository: IUserRepository,

		@inject("HashProvider")
		private hashProvider: IHashProvider
	) {}

	public async execute({ userAccess, password }: IRequest): Promise<IResponse> {
		let user = await this.userRepository.findByEmail(userAccess);

		if (!user)
			throw new Error("Wrong email!");

		const testPassword = await this.hashProvider.compareHash(password, user.password);

		if (!testPassword)
			throw new Error("Wrong password!");

		const { secret, expiresIn, refreshExpiresIn } = authConfig.jwt;
		const roles: string[] = [];

		if (user.admin)
			roles.push("admin");

		const accessToken = sign({}, secret, {
			subject: JSON.stringify({
				id: user.id,
				name: user.name,
				roles
			}), expiresIn
		});

		const refreshToken = sign({}, `${secret}@refresh_tk`, {
			subject: user.email,
			expiresIn: refreshExpiresIn
		});

		return { user, accessToken, refreshToken };
	}
}
