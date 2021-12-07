import { Controller, Get, Post, Body, Headers } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('admin/auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Post('/login')
    login(@Body() data) {
        return this.authService.login(data);
    }
    
    @Get('/me')
    me(@Headers('user_admin') headers) {
        return this.authService.me(headers.id);
    }


}
