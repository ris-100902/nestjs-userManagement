import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { AuthGuard } from './guards/auth.guard';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
@UseGuards(AuthGuard)
export class UsersController {
    constructor(private readonly usersService:UsersService) {}

    @Get()
    getAll(@Query()query: Record<string, string>){
        let page: string, limit: string, search: string;
        page = query.page ? query.page: "1";
        limit = query.limit ? query.limit: "10";
        search = query.search ? query.search: "";
        return this.usersService.getAll(page, limit, search);
    }

    @Get(':id')
    getOne(@Param('id') id:number){
        return this.usersService.getOne(+id);
    }

    @Post()
    createOne(@Body() dto: CreateUserDto){
        return this.usersService.createOne(dto);
    }

    @Patch(':id')
    updateOne(@Param('id')id: number, @Body() dto: UpdateUserDto) {
        return this.usersService.updateOne(+id, dto);
    }

    @Delete(':id')
    deleteOne(@Param('id') id: number) {
        return this.usersService.deleteOne(+id);
    }
}
