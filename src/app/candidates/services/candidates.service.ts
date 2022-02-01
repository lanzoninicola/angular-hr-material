import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { HttpRequestOptionsService } from 'src/app/core/services/http-request-options.service';
import { environment } from 'src/environments/environment';
import { CandidateModel } from '../types/candidates.types';
import { CandidatesStoreService } from './candidates-store.service';

@Injectable({
  providedIn: 'root',
})
export class CandidatesService {
  constructor(
    private http: HttpClient,
    private _store: CandidatesStoreService,
    private _options: HttpRequestOptionsService
  ) {}

  findAll() {
    return this.http
      .get<CandidateModel[]>(
        `${environment.API}/candidates`,
        this._options.backendRequest()
      )
      .pipe(
        map((candidateData) => {
          return candidateData.map((candidate) => {
            return {
              ...candidate,
              fullName: `${candidate.lastname} ${candidate.firstname}`,
            };
          });
        })
      );
  }

  findById(id: number) {
    return this.http
      .get<CandidateModel>(
        `${environment.API}/candidates/${id}`,
        this._options.backendRequest()
      )
      .pipe(
        map((candidateData: CandidateModel) => {
          return {
            ...candidateData,
            fullName: `${candidateData.lastname} ${candidateData.firstname}`,
          };
        })
      );
  }

  save(candidateData: CandidateModel) {
    return this.http
      .post<CandidateModel>(
        `${environment.API}/candidates`,
        candidateData,
        this._options.formSubmission()
      )
      .subscribe((newCandidate) => {
        this._store.currentEntity = newCandidate;
      });
  }

  update(candidateData: CandidateModel) {
    const { id } = candidateData;

    this.http
      .patch<any>(
        `${environment.API}/candidates/${id}`,
        candidateData,
        this._options.formSubmission()
      )
      .subscribe((updatedCandidate) => {
        this._store.currentEntity = updatedCandidate;
      });
  }
}
