import { FakeAdminRepository } from "@domains/users/repositories/FakeAdminRepository";
import { FakeUserRepository } from "@domains/users/repositories/FakeUserRepository";
import { CreateFirstAdminService } from "@domains/users/services/CreateFirstAdminService";
import { FakeBCryptHashProvider } from "@domains/users/providers/HashProvider/implementations/FakeBCryptHashProvider";

let userRepository: FakeUserRepository;
let adminRepository: FakeAdminRepository;
let hashProvider: FakeBCryptHashProvider;
let createFirstAdmin: CreateFirstAdminService;

describe("Create First Admin", () => {
	beforeEach(() => {
		userRepository = new FakeUserRepository();
		adminRepository = new FakeAdminRepository();
		hashProvider = new FakeBCryptHashProvider();
		createFirstAdmin = new CreateFirstAdminService(adminRepository, userRepository, hashProvider);
		process.env.ADMIN_EMAIL = "admin@email.com";
		process.env.ADMIN_PASSWORD = "admin";
	});

	it("should create an admin user", async () => {
		const user = await createFirstAdmin.execute();
		expect(user).toHaveProperty("id");
	});

	it("should not create an admin user without env vars", async () => {
		process.env.ADMIN_EMAIL = "";
		process.env.ADMIN_PASSWORD = "";

		await expect(createFirstAdmin.execute()).rejects.toBeInstanceOf(Error);
	});

	it("should not create an admin user if another already exists", async () => {
		await createFirstAdmin.execute();
		const otherAdmin = await createFirstAdmin.execute();

		expect(otherAdmin).toBeUndefined();
	});
});
