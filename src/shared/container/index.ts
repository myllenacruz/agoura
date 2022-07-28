import { container } from "tsyringe";
import "./providers";

import { UserRepository } from "@domains/users/repositories/UserRepository";
import { IUserRepository } from "@domains/users/interfaces/IUserRepository";

import { AdminRepository } from "@domains/users/repositories/AdminRepository";
import { IAdminRepository } from "@domains/users/interfaces/IAdminRepository";

container.registerSingleton<IUserRepository>("UserRepository", UserRepository);
container.registerSingleton<IAdminRepository>("AdminRepository", AdminRepository);
