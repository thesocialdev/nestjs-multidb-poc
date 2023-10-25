import { IPersonality } from './personality.interface';

export interface IPersonalityService {
  create(data: IPersonality): Promise<IPersonality>;
  findAll(): Promise<IPersonality[]>;
  findOne(id: any): Promise<IPersonality>;
  update(id: any, data: IPersonality): Promise<IPersonality>;
  remove(id: any): Promise<IPersonality>;
}

