import { Module, DynamicModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import dbConfig from './config/db.config';
import { PersonalityModule } from './personality/personality.module';

@Module({})
export class AppModule {
  static register(): DynamicModule {
    const dbType = dbConfig.type;
    const imports = [];

    if (dbType === 'mongodb') {
      imports.push(MongooseModule.forRoot('mongodb://user:password@localhost:27017/admin'));
    } else if (dbType === 'postgresql') {
      imports.push(TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'user',
        password: 'password',
        database: 'mydatabase',
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }));
    }

    return {
      module: AppModule,
      imports: [...imports, PersonalityModule.register()],
    };
  }
}
