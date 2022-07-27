import { v4 as uuidv4 } from "uuid";
import { Admin } from "@domains/users/entities/Admin";
import { IAdminRepository } from "@domains/users/interfaces/IAdminRepository";

export class FakeAdminRepository implements IAdminRepository {
	private admins: Admin[] = [];

	public async hasAdmins(): Promise<boolean> {
		return !!this.admins.length;
	}

	public async create(userId: string): Promise<Admin> {
		const admin = new Admin();
		Object.assign(admin, { userId, id: uuidv4() });

		this.admins.push(admin);

		return admin;
	}

	public async save(admin: Admin): Promise<Admin> {
		const idx = this.admins.findIndex(a => a.id === admin.id);
		this.admins[idx] = admin;

		return admin;
	}

	public async findByUser(userId: string): Promise<Admin | undefined> {
		return this.admins.find(a => a.userId === userId);
	}

	public async remove(admin: Admin): Promise<Admin> {
		const idx = this.admins.findIndex(a => a.id === admin.id);
		this.admins.splice(idx, 1);

		return admin;
	}
}
