import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";

@Injectable()
export class SuperadminonlyGuard implements CanActivate {
    constructor() { }

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        return request.headers.admin.role == 'superadmin';
    }
}
