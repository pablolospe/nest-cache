import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [CacheModule.registerAsync({
    isGlobal: true,
    useFactory: async () => ({
      store: await redisStore({
        socket: {
          host: 'localhost',
          port: 6379,
        }
      }),
    }),
  }),
    UsersModule,
    AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
