import { User } from "../entities/User";
import { FakeBCryptHashProvider } from "@domains/users/providers/HashProvider/implementations/FakeBCryptHashProvider";
import { FakeUserRepository } from "@domains/users/repositories/FakeUserRepository";
import { AuthenticateUserService } from "@domains/users/services/AuthenticateUserService";
import { comumUser } from "@domains/users/mocks/user";

let userRepository: FakeUserRepository;
let hashProvider: FakeBCryptHashProvider;
let authenticateUser: AuthenticateUserService;
let user: User;

describe("Authenticate User", () => {
	beforeEach(async () => {
		userRepository = new FakeUserRepository();
		hashProvider = new FakeBCryptHashProvider();
		authenticateUser = new AuthenticateUserService(userRepository, hashProvider);
		user = await userRepository.create({ ... comumUser });
	});

	it("should authenticate an user with email and password", async () => {
		let response = await authenticateUser.execute({
			userAccess: comumUser.email,
			password: comumUser.password
		});

		expect(response).toHaveProperty("user");
		expect(response).toHaveProperty("accessToken");
		expect(response).toHaveProperty("refreshToken");
		expect(response.user).toEqual(user);
	});

	it("should not authenticate an nonexisting user", async () => {
		await expect(authenticateUser.execute({
			userAccess: "user@gmail.com",
			password: comumUser.password
		})).rejects.toBeInstanceOf(Error);
	});

	it("should not authenticate an user with wrong password", async () => {
		await expect(authenticateUser.execute({
			userAccess: comumUser.email,
			password: "anything"
		})).rejects.toBeInstanceOf(Error);
	});
});
