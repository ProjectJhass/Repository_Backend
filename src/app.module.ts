import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { StockModule } from './stock/stock.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '',
      database: 'JHASS',
      autoLoadEntities: true,
      synchronize: true,
    }),
    
    UsersModule,
    AuthModule,
    StockModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
