import { IHashProvider } from "@domains/users/providers/HashProvider/interfaces/IHashProvider";

export class FakeBCryptHashProvider implements IHashProvider {
	public async generateHash(payload: string): Promise<string> {
		return payload;
	}

	public async compareHash(payload: string, hashed: string): Promise<boolean> {
		return payload == hashed;
	}
}
