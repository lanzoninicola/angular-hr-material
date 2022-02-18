import { Injectable } from '@angular/core';

import { BoardTemplateModel } from '../../models/board-template.model';
import { BoardTemplateDTO } from '../../types/board-template.types';

@Injectable({
  providedIn: 'root',
})
export class BoardTemplateSerializerService {
  constructor() {}

  deserialize(dto: BoardTemplateDTO) {
    return new BoardTemplateModel(dto.id, dto.title, dto.content);
  }

  serialize(model: BoardTemplateModel): BoardTemplateDTO {
    return {
      id: model.getId(),
      title: model.getTitle(),
      content: model.getContent(),
    };
  }
}
