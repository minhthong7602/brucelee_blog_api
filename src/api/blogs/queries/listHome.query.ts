import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { ResponseModel, RESPONSE_STATUS } from '../../../core/configs/response-status.config';
import { BlogsRepository } from '../../../data/repositories/blogs.repository';
import { TagsRepository } from '../../../data/repositories/tags.repository';
import { Blog } from '../../../data/entities/blogs.entity';
import { Tag } from '../../../data/entities/tags.entity';
import { CommonService } from '../../../core/ultils/common.service';
export class ListBlogInHomeQuery {
  page: number;
  page_size: number;
  constructor(page: number, page_size: number) {
    this.page = page;
    this.page_size = page_size;   
  }
}

export class BlogInHome extends Blog {
  total_view: number;
  total_like: number;
  total_comment: number;
  tags?: Tag[];
}

@QueryHandler(ListBlogInHomeQuery)
export class ListBlogInHomeHandler implements IQueryHandler<ListBlogInHomeQuery> {
  constructor(
    @InjectRepository(BlogsRepository)
    private readonly blogRepository: BlogsRepository,
    @InjectRepository(TagsRepository)
    private readonly tagRepository: TagsRepository,
    private commonService: CommonService
  ) {}

  public async execute(query: ListBlogInHomeQuery) : Promise<ResponseModel> {
    const response = new ResponseModel();
    try {
      const result = await this.blogRepository.getBlogInHome(query.page, query.page_size);
      response.data = result[0] as BlogInHome[];
      await this.commonService.asyncForEach(response.data,  async (blog, index) => {
        const tags = await this.tagRepository.getTagsByBlog(blog.id);
        response.data[index].tags = tags[0];
        
      });
      response.status = RESPONSE_STATUS.SUCCESSED;
    } catch(err) {
      response.data = null;
      response.status = RESPONSE_STATUS.ERROR;
      response.message = err;
    }
    return response;
  }
}