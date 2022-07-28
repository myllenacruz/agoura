import { createConnections } from "typeorm";
import { CreateFirstAdminService } from "@domains/users/services/CreateFirstAdminService";
import { container } from "tsyringe";

const connect = async (): Promise<void> => {
	try {
		await createConnections();
	} catch (error) {
		console.error("Error when trying to create a connection\n", error);
	}

	try {
		const createFirstAdmin = container.resolve(CreateFirstAdminService);
		await createFirstAdmin.execute();
	} catch (error) {
		console.error("Error when trying to create admin user!", error);
	}
}

connect();
