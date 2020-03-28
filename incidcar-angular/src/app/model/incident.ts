
import { User } from './user';
import { Employee } from './employee';
import { Comments } from './comments';

export interface Incident {
  id: number;
  title?: string;
  description?: string;
  status?: string;
  user?: User;
  employee?: Employee;
  comments?: Comments[];
}

