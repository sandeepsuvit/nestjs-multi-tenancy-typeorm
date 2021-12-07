import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
    constructor(private readonly jwtService: JwtService) { }
    use(req: Request, res: Response, next: NextFunction) {
        let token_admin = req.headers.token_admin;
        if (token_admin) {
            if (typeof token_admin === 'object') {
                token_admin = token_admin[0]
            }
            const user = this.jwtService.verify(token_admin);
            req.headers.user_admin = user;
        }

        let token_user = req.headers.token_user;
        if (token_user) {
            if (typeof token_user === 'object') {
                token_user = token_user[0]
            }
            const user = this.jwtService.verify(token_user);
            req.headers.user = user;
        }
        next();
    }
}