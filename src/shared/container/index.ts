import { container } from "tsyringe";
import "./providers";

import { UserRepository } from "@domains/users/repositories/UserRepository";
import { IUserRepository } from "@domains/users/interfaces/IUserRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
