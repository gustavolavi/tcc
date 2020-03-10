
import { User } from './user';

export interface Incident {
  id: number;
  name: string;
  title: string;
  description: string;
  user?: User;
  responsavel?: User;
}

