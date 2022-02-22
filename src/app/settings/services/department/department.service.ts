import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { DepartmentDTO, DepartmentModel } from '../../models/department.model';
import { DepartmentsCollection } from '../../models/departments.collection';
import { DepartmentHttpService } from './department-http.service';
import { DepartmentSerializerService } from './department-serializer.service';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(
    private _httpService: DepartmentHttpService,
    private _serializer: DepartmentSerializerService
  ) {}

  findAll(): Observable<DepartmentsCollection> {
    return this._httpService.findAll().pipe(
      map<DepartmentDTO[], DepartmentsCollection>((dtos) => {
        const departments = dtos.map((dto) =>
          this._serializer.deserialize(dto)
        );
        return new DepartmentsCollection(departments);
      })
    );
  }

  findById(id: number): Observable<DepartmentModel> {
    return this._httpService
      .findById(id)
      .pipe(
        map<DepartmentDTO, DepartmentModel>((dto) =>
          this._serializer.deserialize(dto)
        )
      );
  }

  // save(requestToHireData: any) {
  //   //TODO: see the issue https://github.com/lanzoninicola/angular-hr-material/issues/3]
  //   return this.http
  //     .post<any>(
  //       `${environment.API}/departments`,
  //       requestToHireData,
  //       this._httpOptions.isFormSubmission()
  //     )
  //     .subscribe((newRequest) => {
  //       this._store.currentEntity = newRequest;
  //     });
  // }

  // update(requestToHireData: any) {
  //   const { id } = requestToHireData;

  //   this.http
  //     .patch<any>(
  //       `${environment.API}/departments/${id}`,
  //       requestToHireData,
  //       this._httpOptions.isFormSubmission()
  //     )
  //     .subscribe((updatedRequest) => {
  //       this._store.currentEntity = updatedRequest;
  //     });
  // }
}
