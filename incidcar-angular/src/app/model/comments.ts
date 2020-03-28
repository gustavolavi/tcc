import { User } from './user';
import { Incident } from './incident';

export interface Comments {
    id: number;
    description: String;
    user?: User;
    incident?: Incident;
  }