import { getCustomRepository } from 'typeorm';
import { classToPlain } from 'class-transformer';

import { TagsRepositories } from '../repositories/TagsRepositories';

class ListTagsService {

  async execute() {
    const tagsRepositories = getCustomRepository(TagsRepositories);

    let tags = await tagsRepositories.find();
    
    return classToPlain(tags);
  }

}

export { ListTagsService }