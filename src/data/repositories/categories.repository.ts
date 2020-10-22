import { EntityRepository } from 'typeorm';
import { Category } from '../entities/categories.entity';
import { BaseRepository } from '../infrastructure/base.repository';

@EntityRepository(Category)
export class CategoriesRepository extends BaseRepository<Category> {

}