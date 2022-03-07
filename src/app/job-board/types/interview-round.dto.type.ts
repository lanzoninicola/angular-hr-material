export interface InterviewRoundDTO {
  id: number;
  interviewsId: number;
  name: string;
  score: number;
  passed: boolean | null;
  scheduledAt: string;
  createdAt: string;
  updatedAt: string;
}
