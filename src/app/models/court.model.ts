import { Reservation } from './Reservation.model';

export interface Court {
  id?: number;
  name: string;
  img: string;
  available?: boolean;
  description: string;
  adresse: string;
  prixParHeure: string;
  reservations?: Reservation[];
}
