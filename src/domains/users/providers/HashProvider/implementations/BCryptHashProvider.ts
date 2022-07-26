import { hash, compare } from "bcryptjs";
import { IHashProvider } from "@domains/users/providers/HashProvider/interfaces/IHashProvider";

export class BCryptHashProvider implements IHashProvider {
	public async generateHash(payload: string, salt = 8): Promise<string> {
		return hash(payload, salt);
	}

	public async compareHash(payload: string, hashed: string): Promise<boolean> {
		return compare(payload, hashed);
	}
}
