import { Task } from './task';
import { User } from './user';

export interface Process {
    id: number;
    name: string;
    title: string;
    description: string;
    tasks?: Task[];
    Users?: User[];
    Manager?: User;
  }