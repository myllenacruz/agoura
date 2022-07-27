import { FakeUserRepository } from "@domains/users/repositories/FakeUserRepository";
import { FakeBCryptHashProvider } from "@domains/users/providers/HashProvider/implementations/FakeBCryptHashProvider";
import { CreateUserService } from "@domains/users/services/CreateUserService";

let userRepository: FakeUserRepository;
let hashProvider: FakeBCryptHashProvider;
let createUserService: CreateUserService;

const userTest = {
	name: "Jane Roe",
	email: "jane@email.com",
	password: "janeroe"
};

describe("Create User", () => {
	beforeEach(() => {
		userRepository = new FakeUserRepository();
		hashProvider = new FakeBCryptHashProvider();
		createUserService = new CreateUserService(userRepository, hashProvider);
	});

	it("should create an user", async () => {
		const user = await createUserService.execute({
			name: userTest.name,
			email: userTest.email,
			password: userTest.password
		});

		expect(user).toHaveProperty("id");
	});

	it("shouldnot not create an user with the same email", async () => {
		await createUserService.execute({
			name: userTest.name,
			email: userTest.email,
			password: userTest.password
		});

		expect(createUserService.execute({
			name: userTest.name,
			email: userTest.email,
			password: userTest.password
		})).rejects.toBeInstanceOf(Error);
	});
});
