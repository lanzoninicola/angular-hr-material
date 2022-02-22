import { CandidateDTO } from 'src/app/candidates/types/candidate.dto.type';
import { JobIdDTO } from './jobid.dto.type';

export interface JobApplicationDTO {
  id: number;
  jobsId: number;
  candidatesId: number;
  jaworkingstatusesId: number;
  createdAt: string;
  updatedAt: string;
  jobs: JobIdDTO | null;
  candidates: CandidateDTO | null;
}
