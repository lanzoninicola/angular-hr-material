import { InterviewAttendeeModel } from '../models/interview-attendee.model';
import { InterviewRoundModel } from '../models/interview-round.model';

export interface InterviewFeedbackFormData {
  id: number;
  interviewsroundsId: InterviewRoundModel;
  interviewattendeesId: InterviewAttendeeModel;
  description: string;
  rating: number;
  createdAt: Date;
  updatedAt: Date;
}
