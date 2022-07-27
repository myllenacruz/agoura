import { FakeUserRepository } from "@domains/users/repositories/FakeUserRepository";
import { ShowProfileService } from "@domains/users/services/ShowProfileService";

let userRepository: FakeUserRepository;
let showProfileService: ShowProfileService;

const userTest = {
	name: "Jane Roe",
	email: "jane@email.com",
	password: "janeroe"
};

describe("Show Profile", () => {
	beforeEach(() => {
		userRepository = new FakeUserRepository();
		showProfileService = new ShowProfileService(userRepository);
	});

	it("should show user profile", async () => {
		const user = await userRepository.create({
			name: userTest.name,
			email: userTest.email,
			password: userTest.password
		});

		const profile = await showProfileService.execute(user.id);

		expect(profile?.name).toBe(user.name);
	});

	it("should not show the profile of an nonexisting user", async () => {
		expect(showProfileService.execute("")).rejects.toBeInstanceOf(Error)
	});
});
