
import { User } from './user';
import { Employee } from './employee';

export interface Incident {
  id: number;
  title: string;
  description: string;
  user?: User;
  employee?: Employee;
}

