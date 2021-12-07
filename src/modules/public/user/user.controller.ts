import { Controller, Get, Param, Post, Body, Put, Delete, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { SuperadminonlyGuard } from 'src/guards/superadminonly.guard';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ){}

    @Get('/initialize')
    async initialize(){
        return this.userService.initialize();
    }

    @Get('/')
    @UseGuards(SuperadminonlyGuard)
    async findAll(){
        return this.userService.findAll();
    }

    @Get('/me')
    @UseGuards(SuperadminonlyGuard)
    async findMe(@Param('id') id: string){
        return this.userService.findById(id);
    }

    @Get('/:id')
    @UseGuards(SuperadminonlyGuard)
    async findById(@Param('id') id: string){
        return this.userService.findById(id);
    }

    @Post('/')
    async create(@Body() data){
        return this.userService.create(data);
    }

    @Put('/:id')
    async update(@Param('id') id: string, @Body() data){
        return this.userService.update(id, data);
    }

    @Delete('/:id')
    async delete(@Param('id') id: string){
        return this.userService.delete(id);
    }
}