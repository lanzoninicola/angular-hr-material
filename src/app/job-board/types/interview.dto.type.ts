export interface InterviewDTO {
  id: number;
  jobsapplicationsId: number;
  status: number;
  rating: number;
  scheduledAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface InterviewAttendeeDTO {
  id: number;
  interviewsId: number;
  attendeesId: number;
  createdAt: string;
  updatedAt: string;
}
