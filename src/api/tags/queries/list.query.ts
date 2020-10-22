import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsRepository } from '../../../data/repositories/tags.repository';
import { ResponseModel, RESPONSE_STATUS } from '../../../core/configs/response-status.config';
export class ListTagQuery {

}

@QueryHandler(ListTagQuery)
export class ListTagHandler implements IQueryHandler<ListTagQuery> {
  constructor(
    @InjectRepository(TagsRepository)
    private readonly tagsRepository: TagsRepository
  ) {}

  public async execute(query: ListTagQuery) : Promise<ResponseModel> {
    const response = new ResponseModel();
    try {
      response.data = await this.tagsRepository.getAll({ order: {
        "created_at": "DESC"
      }});
      response.status = RESPONSE_STATUS.SUCCESSED;
    } catch(err) {
      response.data = null;
      response.status = RESPONSE_STATUS.ERROR;
    }
    return response;
  }
}