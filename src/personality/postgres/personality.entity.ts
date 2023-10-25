import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Personality {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  slug: string;

  @Column()
  description: string;

  @Column({ unique: true, nullable: true })
  wikidata: string;

  @Column({ default: false })
  isHidden: boolean;
}

