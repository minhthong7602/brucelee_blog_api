import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('tags')
export class Tag extends BaseEntity {
  @Column()
  created_at: Date;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  is_active: boolean;

  constructor(name: string, description: string, is_active: boolean) {
    super();
    this.name = name;
    this.description = description;
    this.is_active = is_active;
  }
}