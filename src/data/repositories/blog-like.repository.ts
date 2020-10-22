import { EntityRepository } from 'typeorm';
import { BlogLike } from '../entities/blog-like.entity';
import { BaseRepository } from '../infrastructure/base.repository';

@EntityRepository(BlogLike)
export class BlogLikeRepository extends BaseRepository<BlogLike> {
  
}
