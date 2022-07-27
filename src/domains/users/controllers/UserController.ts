import { Request, Response } from "express";
import { container } from "tsyringe";
import { ShowProfileService } from "@domains/users/services/ShowProfileService";
import { instanceToInstance } from "class-transformer";

export class UserController {
	async show(req: Request, res: Response): Promise<Response> {
		const { id } = req.params;
		const showProfile = container.resolve(ShowProfileService)
		const user = await showProfile.execute(id);

		return res.json(instanceToInstance(user));
	}
}
