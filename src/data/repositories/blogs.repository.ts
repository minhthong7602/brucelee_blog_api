import { EntityRepository } from 'typeorm';
import { Blog } from '../entities/blogs.entity';
import { BaseRepository } from '../infrastructure/base.repository';

@EntityRepository(Blog)
export class BlogsRepository extends BaseRepository<Blog> {
  public async getBlogInHome(page: number, pageSize: number) {
    return this.query(`CALL GetListBlogInHome(${pageSize}, ${(page-1) * pageSize})`);
  }
}