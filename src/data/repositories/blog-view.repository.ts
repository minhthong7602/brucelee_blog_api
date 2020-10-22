import { EntityRepository } from 'typeorm';
import { BlogView } from '../entities/blog-view.entity';
import { BaseRepository } from '../infrastructure/base.repository';

@EntityRepository(BlogView)
export class BlogViewRepository extends BaseRepository<BlogView> {

}

