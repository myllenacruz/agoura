import { Admin } from "@domains/users/entities/Admin";

export interface IAdminRepository {
	hasAdmins(): Promise<boolean>;
	create(userId: string): Promise<Admin>;
	save(admin: Admin): Promise<Admin>;
	findByUser(userId: string): Promise<Admin | undefined>;
	remove(admin: Admin): Promise<Admin>;
}
