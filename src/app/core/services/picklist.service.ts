import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Picklist, PicklistValues } from '../types/picklist.type';

@Injectable({
  providedIn: 'root',
})
export class PicklistService {
  constructor(private http: HttpClient) {}

  getValuesOf(type: string): Observable<PicklistValues> {
    return this.http
      .get<Picklist[]>(`${environment.API}/picklist?type=${type}`)
      .pipe(
        map((plArray: Picklist[]) => plArray[0]),
        map((picklist: Picklist) => picklist.values)
      );
  }
}
