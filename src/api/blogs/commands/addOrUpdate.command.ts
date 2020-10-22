import { ICommandHandler, CommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { BlogsRepository } from '../../../data/repositories/blogs.repository';
import { BlogTagMappingRepository } from '../../../data/repositories/blog-tag-mapping.repository';
import { BlogCategoryMappingRepository } from '../../../data/repositories/blog-category-mapping.repository';
import { ResponseModel, RESPONSE_STATUS } from '../../../core/configs/response-status.config';
import { Blog } from '../../../data/entities/blogs.entity';
export class AddOrUpdateBlogCommand {
  id: number;
  title: string;
  sub_title: string;
  content: string;
  tags?: number[];
  categories?: number[];
  status?: number;
  constructor(id: number, title: string, sub_title: string, content: string, tags?: number[], categories?: number[], status?: number) {
    this.id = id;
    this.title = title;
    this.sub_title = sub_title;
    this.content = content;
    this.tags = tags || [];
    this.categories = categories || [];
    this.status = status;
  }
}

@CommandHandler(AddOrUpdateBlogCommand)
export class AddOrUpdateBlogHandler implements ICommandHandler<AddOrUpdateBlogCommand> {
  constructor(
    @InjectRepository(BlogsRepository)
    private readonly blogRepository: BlogsRepository,
    @InjectRepository(BlogTagMappingRepository)
    private readonly blogTagMappingRepository: BlogTagMappingRepository,
    @InjectRepository(BlogCategoryMappingRepository)
    private readonly blogCategoryMappingRepository: BlogCategoryMappingRepository
  ) {}

  public async execute(command: AddOrUpdateBlogCommand) : Promise<ResponseModel> {
    const response = new ResponseModel();
    try {
      console.log('command', command)
      if(command.id == 0) {
        const blogTemp = new Blog();
        blogTemp.content = command.content;
        blogTemp.title = command.title;
        blogTemp.sub_title = command.sub_title;
        blogTemp.status = command.status;
        const blog = await this.blogRepository.insertData(blogTemp);
        await this.blogTagMappingRepository.insertList(blog.id, command.tags);
        await this.blogCategoryMappingRepository.insertList(blog.id, command.categories);
        response.data = blog;
        response.status = RESPONSE_STATUS.SUCCESSED;
      } else {
        const blogTemp = await this.blogRepository.getById(command.id);
        if(blogTemp) {
          blogTemp.content = command.content;
          blogTemp.title = command.title;
          blogTemp.sub_title = command.sub_title;
          blogTemp.status = command.status;
          const blog = await this.blogRepository.updateData(blogTemp);
          await this.blogTagMappingRepository.deleteByBlog(blog.id);
          await this.blogTagMappingRepository.insertList(blog.id, command.tags);
          await this.blogCategoryMappingRepository.deleteByBlog(blog.id);
          await this.blogCategoryMappingRepository.insertList(blog.id, command.categories);
          response.data = blog;
        } else {
          response.data = null;
          response.status = RESPONSE_STATUS.ERROR;
          response.message = "Blog not found";
        }
      }
    } catch(err) {
      response.data = null;
      response.status = RESPONSE_STATUS.ERROR;
      response.message = err;
    }
    return response;
  }
}
