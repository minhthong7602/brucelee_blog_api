import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectRepository } from '@nestjs/typeorm';
import { TagsRepository } from '../../../data/repositories/tags.repository';
import { Tag } from '../../../data/entities/tags.entity';
import { RESPONSE_STATUS, ResponseModel } from '../../../core/configs/response-status.config';

export class AddOrUpdateTagCommand {
  id: number;
  name: string;
  description: string;
  is_active: boolean;
  constructor(name: string, description: string, id: number = 0, is_active: boolean = true) {
    this.name = name;
    this.description = description;
    this.id = id;
    this.is_active = is_active;
  }
}

@CommandHandler(AddOrUpdateTagCommand)
export class AddTagHandler implements ICommandHandler<AddOrUpdateTagCommand> {
  constructor(
    @InjectRepository(TagsRepository)
    private readonly tagsRepository: TagsRepository
  ) {}

  public async execute(command: AddOrUpdateTagCommand) : Promise<ResponseModel> {
    const response = new ResponseModel();
    try {
      if(command.id == 0) {
        const tag = new Tag(command.name, command.description, command.is_active);
        response.status = RESPONSE_STATUS.SUCCESSED;
        response.data = await this.tagsRepository.insertData(tag);
        response.message = 'Add tag successfully';
      } else {
        const tag = await this.tagsRepository.getById(command.id);
        if(!tag) {
          response.data = null;
          response.status = RESPONSE_STATUS.ERROR;
          response.message = 'Not exists tag';
        } else {
          tag.name = command.name;
          tag.description = command.description;
          tag.is_active = command.is_active;
          response.data = await this.tagsRepository.updateData(tag);
          response.message = 'Update tag successfully';
          response.status = RESPONSE_STATUS.SUCCESSED;
        }
      }
    } catch(err) {
      response.data = null;
      response.status = RESPONSE_STATUS.ERROR;
    }
    return response;
  }
}