import { Injectable } from '@angular/core';
import { forkJoin, map, Observable, switchMap } from 'rxjs';
import { UserModel } from 'src/app/users/models/user.model';
import { UsersCollection } from 'src/app/users/models/users.collection';
import { UsersService } from 'src/app/users/services/users.service';
import { InterviewAttendeeModel } from '../models/interview-attendee.model';
import { InterviewCollection } from '../models/interview.collection';
import { InterviewModel } from '../models/interview.model';
import { InterviewAttendeeDTO } from '../types/interview.dto.type';
import { InterviewAttendeeHttpService } from './interview-attendee-http.service';
import { InterviewAttendeeSerializerService } from './interview-attendee-serializer.service';
import { InterviewService } from './interview.service';

@Injectable({
  providedIn: 'root',
})
export class InterviewAttendeeService {
  constructor(
    private _httpService: InterviewAttendeeHttpService,
    private _interviewService: InterviewService,
    private _usersService: UsersService,
    private _serializationService: InterviewAttendeeSerializerService
  ) {}

  // findAll(): Observable<InterviewAttendeeModel[]> {
  //   const records$: Observable<InterviewAttendeeDTO[]> = this._httpService.findAll();

  //   const interviews$: Observable<InterviewCollection> =
  //     this._interviewService.findAll();

  //   const users$: Observable<UsersCollection> = this._usersService.findAll()

  //   return forkJoin([records$, interviews$, users$]).pipe(
  //     map(([records, interviews, users]) => {
  //       const interviewAt = records.map((record) => {
  //         const jobApplication = jobApplications.findItemById(
  //           record.jobsapplicationsId
  //         );
  //         const picklistItem = picklist.findItemById(record.status);

  //         return this._serializationService.deserialize(record, {
  //           jobApplication,
  //           picklistItem,
  //         });
  //       });

  //       return new InterviewCollection(interviews);
  //     })
  //   );
  // }

  findById(id: number): Observable<InterviewAttendeeModel> {
    // if (this._shouldCurrentCached(id)) {
    //   return of(this._currentCached());
    // }

    const record$: Observable<InterviewAttendeeDTO> =
      this._httpService.findById(id);

    const interview$: Observable<InterviewModel> = record$.pipe(
      switchMap((record) => {
        return this._interviewService.findById(record.interviewsId);
      })
    );

    const user$: Observable<UserModel> = record$.pipe(
      switchMap((record) => {
        return this._usersService.findById(record.attendeesId);
      })
    );

    return forkJoin([record$, interview$, user$]).pipe(
      map(([record, interview, user]) => {
        return this._serializationService.deserialize(record, {
          interview,
          user,
        });
      })
    );
  }

  findByInterview(
    interview: InterviewModel
  ): Observable<InterviewAttendeeModel[]> {
    const records$: Observable<InterviewAttendeeDTO[]> =
      this._httpService.findByParam('interviewsId', String(interview.getId()));

    const users$: Observable<UsersCollection> = this._usersService.findAll();

    return forkJoin([records$, users$]).pipe(
      map(([records, users]) => {
        const interviews = records.map((record) => {
          const user = users.findItemById(record.attendeesId);

          return this._serializationService.deserialize(record, {
            interview,
            user,
          });
        });

        return interviews;
      })
    );
  }

  save(model: InterviewAttendeeModel) {
    const dto = this._serializationService.serialize(model);
    return this._httpService.save(dto);
  }

  update(model: InterviewAttendeeModel) {
    const dto = this._serializationService.serialize(model);
    return this._httpService.update(dto);
  }

  delete(id: number) {
    return this._httpService.delete(id);
  }

  // getEntityModelFromFormData(
  //   formData: InterviewFormData
  // ): InterviewAttendeeModel {
  //   return new InterviewAttendeeModel(
  //     formData.id,
  //     formData.jobsapplicationsId,
  //     formData.status,
  //     formData.rating,
  //     formData.scheduledAt,
  //     formData.createdAt,
  //     formData.updatedAt
  //   );
  // }
}
