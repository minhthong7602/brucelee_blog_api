import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from '../../../data/repositories/categories.repository';
import { ResponseModel, RESPONSE_STATUS } from '../../../core/configs/response-status.config';
export class ListCategoryQuery {

}

@QueryHandler(ListCategoryQuery)
export class ListCategoryHandler implements IQueryHandler<ListCategoryQuery> {
  constructor(
    @InjectRepository(CategoriesRepository)
    private readonly categoriesRepository: CategoriesRepository
  ) {}

  public async execute (query: ListCategoryQuery) : Promise<ResponseModel> {
    const response = new ResponseModel();
    try {
      response.data = await this.categoriesRepository.getAll({
        order: {
          "created_at": "DESC"
        }
      });
      response.status = RESPONSE_STATUS.SUCCESSED;
    } catch(err) {
      response.data = null;
      response.status = RESPONSE_STATUS.ERROR;
    }
    return response;
  }
}