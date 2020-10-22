import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { RESPONSE_STATUS, ResponseModel } from '../../../core/configs/response-status.config';
import { InjectRepository } from '@nestjs/typeorm';
import { CategoriesRepository } from '../../../data/repositories/categories.repository';
import { Category } from '../../../data/entities/categories.entity';
export class AddOrUpdateCategoryCommand {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  constructor(name: string, description: string, is_active, id?: number) {
    this.name = name;
    this.description = description;
    this.is_active = is_active;
    this.id = id || 0;
  }
}

@CommandHandler(AddOrUpdateCategoryCommand)
export class AddOrUpdateCommandHandler implements ICommandHandler<AddOrUpdateCategoryCommand> {
  constructor(
    @InjectRepository(CategoriesRepository)
    private readonly categoriesRepository: CategoriesRepository
  ) {}

  public async execute(command: AddOrUpdateCategoryCommand) : Promise<ResponseModel> {
    const response = new ResponseModel();
    try {
      if(command.id === 0) {
        const category = new Category();
        category.name = command.name;
        category.description = command.description;
        category.is_active = true;
        response.status = RESPONSE_STATUS.SUCCESSED;
        response.data = await this.categoriesRepository.insertData(category);
        response.message = 'Add category successfully';
      } else {
        const category = await this.categoriesRepository.getById(command.id);
        if(!category) {
          response.data = null;
          response.status = RESPONSE_STATUS.ERROR;
          response.message = 'Not exists category';
        } else {
          category.name = command.name;
          category.description = command.description;
          category.is_active = command.is_active;
          response.data = await this.categoriesRepository.updateData(category);
          response.status = RESPONSE_STATUS.SUCCESSED;
          response.message = 'Update category successfully';
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