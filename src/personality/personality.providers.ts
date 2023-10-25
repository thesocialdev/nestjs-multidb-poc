import dbConfig from '../config/db.config';
import { MongoPersonalityService } from './mongo/personality.service';
import { PostgresPersonalityService } from './postgres/personality.service';
import { IPersonalityService } from '../interfaces/personality.service.interface';
import { Provider } from '@nestjs/common';

export const personalityServiceProvider: Provider = {
  provide: 'PersonalityService',
  useFactory: (
    mongoService: MongoPersonalityService | null, 
    postgresService: PostgresPersonalityService | null
  ): IPersonalityService => {
    if (dbConfig.type === 'mongodb' && mongoService) {
      return mongoService;
    } else if (dbConfig.type === 'postgresql' && postgresService){
      return postgresService;
    } else {
      throw new Error('Invalid DB_TYPE in configuration');
    }
  },
  inject: [MongoPersonalityService, PostgresPersonalityService],
};
