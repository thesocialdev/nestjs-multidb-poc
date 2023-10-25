// src/postgres/personality.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Personality } from './personality.entity';
import { IPersonalityService } from '../../interfaces/personality.service.interface';
import { IPersonality } from '../../interfaces/personality.interface';

@Injectable()
export class PostgresPersonalityService implements IPersonalityService {
  constructor(
    @InjectRepository(Personality)
    private personalityRepository: Repository<Personality>,
  ) {}

  async create(data: IPersonality): Promise<IPersonality> {
    const createdPersonality = this.personalityRepository.create(data);
    return this.personalityRepository.save(createdPersonality);
  }

  async findAll(): Promise<IPersonality[]> {
    return this.personalityRepository.find();
  }

  async findOne(id: number): Promise<IPersonality> {
    return this.personalityRepository.findOne({ where: { id } });
  }

  async update(id: number, data: IPersonality): Promise<IPersonality> {
    await this.personalityRepository.update(id, data);
    return this.personalityRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<IPersonality> {
    const personality = await this.personalityRepository.findOne({ where: { id } });
    return this.personalityRepository.remove(personality);
  }
}

