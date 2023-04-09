import { Request } from 'express';

export interface LayananIface {
  path: string;
  method: string;
  url: string;
  role: number[];
}

export interface AuthRequest extends Request {
  user?: {
    username: string;
  };
  endpoin?: LayananIface;
}

export interface UserIface {
  username: string;
  password: string;
  role: number;
}
