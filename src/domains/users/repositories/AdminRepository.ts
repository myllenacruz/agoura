import { Admin } from "@domains/users/entities/Admin";
import { IAdminRepository } from "@domains/users/interfaces/IAdminRepository";
import { Repository, getRepository } from "typeorm";

export class AdminRepository implements IAdminRepository {
	private ormRepository: Repository<Admin>;

	constructor() {
		this.ormRepository = getRepository(Admin);
	}

	public async hasAdmins(): Promise<boolean> {
		const admins = await this.ormRepository.createQueryBuilder("admin").getCount();
		return !!admins;
	}

	public async create(userId: string): Promise<Admin> {
		const admin = this.ormRepository.create({ userId });
		await this.ormRepository.save(admin);

		return admin;
	}

	public async save(admin: Admin): Promise<Admin> {
		return this.ormRepository.save(admin);
	}

	public async findByUser(userId: string): Promise<Admin | undefined> {
		return this.ormRepository.findOne({ userId });
	}

	public async remove(admin: Admin): Promise<Admin> {
		return this.ormRepository.remove(admin);
	}
}
