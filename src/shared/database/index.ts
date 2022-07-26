import { createConnections } from "typeorm";

const connect = async (): Promise<void> => {
	try {
		await createConnections();
	} catch (error) {
		console.error("Error when trying to create a connection\n", error);
	}
}

connect();
