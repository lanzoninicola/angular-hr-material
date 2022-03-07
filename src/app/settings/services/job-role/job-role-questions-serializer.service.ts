import { Injectable } from '@angular/core';
import { JobRoleQuestionModel } from '../../models/job-role-question.model';
import { JobRoleModel } from '../../models/job-role.model';
import { PicklistItemModel } from '../../models/picklist-item.model';
import { JobRoleQuestionDTO } from '../../types/job-role-question.dto.type';

@Injectable({
  providedIn: 'root',
})
export class JobRoleQuestionsSerializerService {
  constructor() {}

  deserialize(
    dto: JobRoleQuestionDTO,
    relatedModels: {
      jobRole: JobRoleModel;
      roleLevel: PicklistItemModel;
    }
  ): JobRoleQuestionModel {
    const { jobRole, roleLevel } = relatedModels;

    return {
      id: dto.id,
      jobRole: jobRole,
      roleLevel: roleLevel,
      question: dto.question,
    };
  }

  serialize(model: JobRoleQuestionModel): JobRoleQuestionDTO {
    return {
      id: model.id,
      jobrolesId: model.jobRole.getId(),
      roleLevel: model.roleLevel.getId(),
      question: model.question,
    };
  }
}
