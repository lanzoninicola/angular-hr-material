import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { BranchDTO, BranchModel } from '../../models/branch.model';
import { BranchHttpService } from './branch-http.service';
import { BranchSerializerService } from './branch-serializer.service';

@Injectable({
  providedIn: 'root',
})
export class BranchService {
  constructor(
    private _httpService: BranchHttpService,
    private _serializer: BranchSerializerService
  ) {}

  findAll(): Observable<BranchModel[]> {
    return this._httpService.findAll().pipe(
      map<BranchDTO[], BranchModel[]>((dtos) => {
        return dtos.map((dto) => this._serializer.deserialize(dto));
      })
    );
  }

  findById(id: number): Observable<BranchModel> {
    return this._httpService
      .findById(id)
      .pipe(
        map<BranchDTO, BranchModel>((dto) => this._serializer.deserialize(dto))
      );
  }

  // save(requestToHireData: any) {
  //   //TODO: see the issue https://github.com/lanzoninicola/angular-hr-material/issues/3]
  //   return this.http
  //     .post<any>(
  //       `${environment.API}/branches`,
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
  //       `${environment.API}/branches/${id}`,
  //       requestToHireData,
  //       this._httpOptions.isFormSubmission()
  //     )
  //     .subscribe((updatedRequest) => {
  //       this._store.currentEntity = updatedRequest;
  //     });
  // }
}
