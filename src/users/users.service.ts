import { Inject, Injectable, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { sleep } from 'src/sleep';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

const users = [
  { id: 1, name: 'John' },
  { id: 2, name: 'Doe' },
]

@Injectable()
export class UsersService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll() {
    const key = 'users-find-all';
    const usersCached = await this.cacheManager.get(key);
    if (usersCached) {
      return usersCached;
    }

    await this.cacheManager.set(key, users, 1000 * 10); // TTL: TIEMPO QUE GUARDA EN CACHE
    await sleep(3000);
    return users;
  }

  findOne(id: number) {
    return users.find(user => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
