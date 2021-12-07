import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards, Headers } from '@nestjs/common';
import { UserService } from './user.service';
import { SuperAdminOnlyGuard } from 'src/guards/super-admin-only.guard';
import { HasTokenAdminGuard } from 'src/guards/has-token-admin.guard';
import { UserReq, UserReqUpdate } from './dto/user.req';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) { }

    @Get('/initialize')
    async initialize() {
        return this.userService.initialize();
    }

    @Get('/')
    @UseGuards(SuperAdminOnlyGuard)
    async findAll() {
        return this.userService.findAll();
    }

    @Get('/me')
    @UseGuards(HasTokenAdminGuard)
    async findMe(@Headers('user_admin') user_admin) {
        return this.userService.findById(user_admin.id);
    }

    @Get('/:id')
    @UseGuards(SuperAdminOnlyGuard)
    async findById(@Param('id') id: string) {
        return this.userService.findById(id);
    }

    @Post('/')
    async create(@Body() data: UserReq) {
        return this.userService.create(data);
    }

    @Put('/me')
    @UseGuards(HasTokenAdminGuard)
    async updateMe(@Headers('user_admin') user_admin, @Body() data: UserReqUpdate) {
        return this.userService.update(user_admin.id, data);
    }

    @Put('/:id')
    @UseGuards(SuperAdminOnlyGuard)
    async update(@Param('id') id: string, @Body() data: UserReqUpdate) {
        return this.userService.update(id, data);
    }

    @Delete('/:id')
    @UseGuards(SuperAdminOnlyGuard)
    async delete(@Param('id') id: string) {
        return this.userService.delete(id);
    }
}