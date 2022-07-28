import { Request, Response, NextFunction } from "express";
import { ensureAuthentication } from "./ensureAuthentication";

export function ensureAuthorization(roles: string[] | string = []):
	(req: Request, res: Response, next: NextFunction) => Promise<void> {
	let roleList: string[];

	if (typeof roles == "string")
		roleList = [roles];
	else
		roleList = roles;

	return async (req: Request | any, res: Response, next: NextFunction) => {
		await ensureAuthentication(req, res, () => {
			const found = roleList.some(role => req.user.roles.includes(role));

			if (roleList.length && !found)
				throw Error("Forbidden!");

			next();
		});
	};
}
