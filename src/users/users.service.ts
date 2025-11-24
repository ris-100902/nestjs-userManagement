import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    private users = [{id:1, name:'Rishabh'}, {id:2, name:'testUser'}];

    getAll(page: string, limit: string, search: string): object{
        const filteredArray = this.users.filter(user => user.name.includes(search));
        let startIdx = (Number(page)-1)*Number(limit), endIdx = startIdx + Number(limit);
        return filteredArray.slice(startIdx, endIdx);
    }

    getOne(id: number) {
        const oneUser = this.users.find(user => id === user.id);
        if (!oneUser) {
            throw new NotFoundException(`User with id:${id} does not exist`);
        }
        return oneUser;
    }

    createOne(dto: CreateUserDto) {
        const newUser = {id: this.users.length +1, name:dto.name};
        this.users.push(newUser);
        return newUser;
    }

    updateOne(id: number, dto: UpdateUserDto){
        const changingUser = this.users.find(user => user.id === id);
        if (!changingUser) {
            throw new NotFoundException(`User with id:${id} does not exist`);
        }

        if (dto.name) changingUser.name = dto.name;
        return changingUser;
    }

    deleteOne(id: number){
        const userToBeDeleted = this.users.findIndex(user => user.id === id);
        if (userToBeDeleted === -1) {
            throw new NotFoundException(`User with id:${id} does not exist`);
        }
        this.users.splice(userToBeDeleted, 1);
        return `User deleted with id: ${id}`;
    }
}
