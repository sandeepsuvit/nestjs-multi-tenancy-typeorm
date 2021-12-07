import { Controller, Get, Headers, Post, UseGuards, Body, Put, Param, Delete } from '@nestjs/common';
import { TeamService } from './team.service';
import { HasTokenAdminGuard } from 'src/guards/has-token-admin.guard';

@Controller('team')
export class TeamController {
    constructor(private teamService: TeamService) { }

    @Get('/')
    @UseGuards(HasTokenAdminGuard)
    findAll(@Headers('user_admin') user_admin) {
        return this.teamService.findAll({ auth: user_admin });
    }

    @Get('/:id')
    @UseGuards(HasTokenAdminGuard)
    findById(@Headers('user_admin') user_admin, @Param('id') id) {
        return this.teamService.findById({ auth: user_admin, id });
    }

    @Post('/')
    @UseGuards(HasTokenAdminGuard)
    create(@Headers('user_admin') user_admin, @Body() data) {
        return this.teamService.create({ auth: user_admin, data });
    }

    @Put('/:id')
    @UseGuards(HasTokenAdminGuard)
    update(@Headers('user_admin') user_admin, @Param('id') id, @Body() data) {
        return this.teamService.update({ auth: user_admin, id, data });
    }

    @Delete('/:id')
    @UseGuards(HasTokenAdminGuard)
    delete(@Headers('user_admin') user_admin, @Param('id') id) {
        return this.teamService.delete({ auth: user_admin, id });
    }
}
