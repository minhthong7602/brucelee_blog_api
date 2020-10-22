import { EntityRepository } from 'typeorm';
import { Tag } from '../entities/tags.entity';
import { BaseRepository } from '../infrastructure/base.repository';

@EntityRepository(Tag)
export class TagsRepository extends BaseRepository<Tag> {
  public async getTagsByBlog(blogId: number) {
    return this.query(`CALL GetTagsByBlog(${blogId})`);
  }
}