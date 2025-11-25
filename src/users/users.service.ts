import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ){}

    async getAll(page: string, limit: string, search: string): Promise<User[]>{
        let skip = (Number(page)-1)*Number(limit);
        const allUsers = await this.userRepository.find({ 
            where : { name: Like(`%${search}%`)},
            skip: skip,
            take: Number(limit)
        });
        return allUsers;
    }

    async getOne(id: number): Promise<User> {
        const oneUser = await this.userRepository.findOne({where : {id}});
        if (!oneUser) {
            throw new NotFoundException(`User with id:${id} does not exist`);
        }
        return oneUser;
    }

    async createOne(dto: CreateUserDto): Promise<User> {
        const newUser = await this.userRepository.create(dto);
        return this.userRepository.save(newUser);
    }

    async updateOne(id: number, dto: UpdateUserDto): Promise<User>{
        const changingUser = await this.userRepository.findOne({where :{id}});
        if (!changingUser) {
            throw new NotFoundException(`User with id:${id} does not exist`);
        }

        Object.assign(changingUser, dto);
        return this.userRepository.save(changingUser);
    }

    async deleteOne(id: number): Promise<string>{
        const userToBeDeleted = await this.userRepository.findOne({where: {id}});
        if (!userToBeDeleted) {
            throw new NotFoundException(`User with id:${id} does not exist`);
        }
        await this.userRepository.delete(id);
        return `User deleted with id: ${id}`;
    }
}
