import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    private users = [{id:1, name:'Rishabh'}, {id:2, name:'testUser'}];

    getAll(): object{
        return this.users;
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
}
