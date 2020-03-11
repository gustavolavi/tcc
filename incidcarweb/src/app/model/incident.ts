
import { User } from './user';

export interface Incident {
  id: number;
  title: string;
  description: string;
  user?: User;
  responsavel?: User;
}

