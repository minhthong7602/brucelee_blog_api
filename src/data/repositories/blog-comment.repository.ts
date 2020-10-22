import { EntityRepository } from 'typeorm';
import { BlogComment } from '../entities/blog-comment.entity';
import { BaseRepository } from '../infrastructure/base.repository';

@EntityRepository(BlogComment)
export class BlogCommentRepository extends BaseRepository<BlogComment> {
  
}
