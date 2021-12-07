import { Controller, Get, Post, Body, Headers, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { HasTokenAdminGuard } from 'src/guards/has-token-admin.guard';

@Controller('admin/auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @Post('/login')
    login(@Body() data) {
        return this.authService.login(data);
    }
    
    @Get('/me')
    @UseGuards(HasTokenAdminGuard)
    me(@Headers('user_admin') headers) {
        return this.authService.me(headers.id);
    }


}
