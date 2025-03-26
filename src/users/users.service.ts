import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { sleep } from 'src/sleep';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

export type User = any;

@Injectable()
export class UsersService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }
  
  private readonly users = [
    {
      userId: 1,
      username: 'john',
      password: 'changeme',
    },
    {
      userId: 2,
      username: 'maria',
      password: 'guess',
    },
  ];

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }
  
  async findAll() {
    const key = 'users-find-all';
    const usersCached = await this.cacheManager.get(key);
    if (usersCached) {
      return usersCached;
    }

    await sleep(3000);
    
    await this.cacheManager.set(key, this.users, 1000 * 10); // TTL: TIEMPO QUE GUARDA EN CACHE
    return this.users;
  }

  async findOne(username: string): Promise<User | undefined> {
    return this.users.find(user => user.username === username);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}


