import { User } from './user';
import { Process } from './process';

export interface Employee {
  id: number;
  user?: User;
  process?: Process;
}