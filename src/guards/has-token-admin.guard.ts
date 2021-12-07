import { CanActivate, Injectable, ExecutionContext, UnauthorizedException } from "@nestjs/common";
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class HasTokenAdminGuard implements CanActivate {
    constructor(private jwtService: JwtService) { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const token = request.headers.token_admin;
        if (!token) {
            throw new UnauthorizedException("No token provided");
        }
        const verify = this.jwtService.verify(token);
        if (!verify) {
            throw new UnauthorizedException("Invalid token");
        }
        return true
    }
}
