// src/services/personality.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { MongoPersonality } from './schemas/personality.schema';

@Injectable()
export class MongoPersonalityService {
  constructor(@InjectModel(MongoPersonality.name) private personalityModel: Model<MongoPersonality>) {}

  create(createPersonalityDto: any): Promise<MongoPersonality> {
    const createdPersonality = new this.personalityModel(createPersonalityDto);
    return createdPersonality.save();
  }

  findAll(): Promise<MongoPersonality[]> {
    return this.personalityModel.find().exec();
  }

  findOne(id: string): Promise<MongoPersonality> {
    return this.personalityModel.findById(id).exec();
  }

  update(id: string, updatePersonalityDto: any): Promise<MongoPersonality> {
    return this.personalityModel.findByIdAndUpdate(id, updatePersonalityDto, { new: true }).exec();
  }

  remove(id: string): Promise<MongoPersonality> {
    return this.personalityModel.findByIdAndRemove(id).exec();
  }
}

