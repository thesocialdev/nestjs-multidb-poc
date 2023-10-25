import { Module, DynamicModule, Logger } from '@nestjs/common';
import { personalityServiceProvider } from './personality.providers';
import { MongoPersonalityService } from './mongo/personality.service';
import { PostgresPersonalityService } from './postgres/personality.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Personality } from './postgres/personality.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { PersonalitySchema } from './mongo/schemas/personality.schema';
import { PersonalityController } from './personality.controller';
import dbConfig from '../config/db.config';

@Module({})
export class PersonalityModule {
  
  static register(): DynamicModule {
    const imports = [];
    const providers = [personalityServiceProvider];
    const logger = new Logger("PersonalityModule")
  
    logger.log(`Database selected: ${dbConfig.type}`);


    if (dbConfig.type === 'mongodb') {
      imports.push(MongooseModule.forFeature([{ name: 'MongoPersonality', schema: PersonalitySchema }]));
      providers.push(MongoPersonalityService);
      providers.push({ provide: PostgresPersonalityService, useValue: null });
    } else if (dbConfig.type === 'postgresql') {
      imports.push(TypeOrmModule.forFeature([Personality]));
      providers.push(PostgresPersonalityService);
      providers.push({ provide: MongoPersonalityService, useValue: null });

    }

    return {
      module: PersonalityModule,
      imports,
      providers,
      controllers: [PersonalityController],
      exports: ['PersonalityService'],
    };
  }
}

