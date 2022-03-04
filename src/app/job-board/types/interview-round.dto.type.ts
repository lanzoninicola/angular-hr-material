export interface InterviewRoundDTO {
  id: number;
  interviewsId: number;
  name: string;
  rating: number;
  passed: boolean | null;
  scheduledAt: string;
  createdAt: string;
  updatedAt: string;
}
