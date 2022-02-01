import { Injectable } from '@angular/core';
import { ModuleStoreService } from 'src/app/core/services/module-store.service';

@Injectable({
  providedIn: 'root',
})
export class CandidatesStoreService extends ModuleStoreService {}
