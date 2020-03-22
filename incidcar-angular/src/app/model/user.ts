import { Employee } from './employee';

export interface User {
    id: number;
    name: string;
    email: string;
    username: string;
    password: string;
    employee?: Employee;
}