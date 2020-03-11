import { Task } from './task';
import { Employee } from './employee';

export interface Process {
    id: number;
    title: string;
    description: string;
    tasks?: Task[];
    employees?: Employee[];
    Manager?: Employee;
  }