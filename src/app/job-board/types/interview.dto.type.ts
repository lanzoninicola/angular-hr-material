export interface InterviewDTO {
  id: number;
  jobsapplicationsId: number;
  stage: number;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewAttendeeDTO {
  id: number;
  interviewsroundsId: number;
  usersId: number;
  createdAt: string;
  updatedAt: string;
}
