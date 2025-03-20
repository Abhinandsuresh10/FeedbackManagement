import { Response, NextFunction } from 'express';
import { HttpStatus } from '../constants/status.constants';
import { generateAccessToken, verifyAccessToken, verifyRefreshToken } from '../utils/jwt.util';
import { AuthRequest, JwtPayload } from '../types/jwt.types';

export const verifyJWT = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
    try {
        console.log("check headers and body:", req.headers, req.body);

        const authHeader = req.headers.authorization;
        const accessToken = authHeader && authHeader.startsWith("Bearer ") ? authHeader.split(" ")[1] : undefined;
        const refreshToken = req.cookies?.refreshtoken || req.headers.cookie?.split('refreshtoken=')[1]?.split(';')[0];

        console.log("Access Token:", accessToken);
        console.log("Refresh Token:", refreshToken);

        if (!accessToken || !refreshToken) {
            res.status(HttpStatus.UNAUTHORIZED).json({
                status: 'error',
                message: 'Access token or refresh token not provided'
            });
            return;
        }

        const decodedAccess = verifyAccessToken(accessToken);

        if (typeof decodedAccess === "object" && decodedAccess !== null) {
            req.user = decodedAccess as JwtPayload;
            next();
            return;
        }

        const decodedRefresh = await verifyRefreshToken(refreshToken) as JwtPayload;

        if (!decodedRefresh) {
            res.status(HttpStatus.UNAUTHORIZED).json({
                status: 'error',
                message: 'Invalid or expired refresh token'
            });
            return;
        }

        const newAccessToken = generateAccessToken({ id: decodedRefresh.id, email: decodedRefresh.email });
        console.log("New Access Token:", newAccessToken);

        res.setHeader('Authorization', `Bearer ${newAccessToken}`);
        req.user = decodedRefresh;
        next();
    } catch (error) {
        console.error("JWT Middleware Error:", error);
        res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            status: 'error',
            message: 'JWT middleware error'
        });
    }
};
