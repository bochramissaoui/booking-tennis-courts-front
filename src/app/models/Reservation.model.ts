import { Court } from './court.model';
import { User } from './User.model';

export interface Reservation {
  id?: number;
  court: any;
  user?: any;
  startTime: Date;
  duration: number;
}
