import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity('blogs')
export class Blog extends BaseEntity {
  @Column()
  created_at: Date;

  @Column()
  updated_at: Date;

  @Column()
  title: string;

  @Column()
  sub_title: string;

  @Column()
  content: string;

  @Column()
  images: string;

  @Column()
  status: number;
}