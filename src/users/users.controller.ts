import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from './guards/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly usersService:UsersService) {}

    @Get()
    getAll(){
        return this.usersService.getAll();
    }

    @Get(':id')
    getOne(@Param('id') id:number){
        return this.usersService.getOne(+id);
    }

    @Post()
    createOne(@Body() dto: CreateUserDto){
        return this.usersService.createOne(dto);
    }
}
