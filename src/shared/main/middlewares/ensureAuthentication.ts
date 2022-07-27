import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";
import authConfig from "@config/auth";

interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}

export async function ensureAuthentication(
    req: Request | any,
    _res: Response,
    next: NextFunction
): Promise<void> {
    const authHeader = req.headers.authorization;

    if (!authHeader)
        throw new Error("Authorization failed: Token not provided!");

    const [, token] = authHeader.split(" ");

    try {
        const decoded = verify(token, authConfig.jwt.secret);
		const { sub } = decoded as ITokenPayload;
		const { id, name, roles } = JSON.parse(sub);

		req.user = { id, name, roles };
    } catch (error) {
		throw new Error("Authorization failed: Invalid token!");
    }

	next();
}
