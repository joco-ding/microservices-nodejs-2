import { Request } from 'express';

export const secretKey = 'ini-kunci-rahasia';

export interface LayananIface {
  path: string;
  method: string;
  url: string;
  role: number[];
}

export interface AuthenticatedRequest extends Request {
  user?: {
    username: string;
  };
  endpoin?: LayananIface;
}

export const layanans: LayananIface[] = [
  {
    path: '/api/layanan-satu',
    url: 'http://localhost:3001/api/layanan-satu',
    method: 'GET',
    role: [1],
  },
  {
    path: '/api/layanan-dua',
    url: 'http://localhost:3002/api/layanan-dua',
    method: 'GET',
    role: [1,2],
  },
  {
    path: '/api/login',
    url: 'http://localhost:3003/api/login',
    method: 'POST',
    role: [],
  }
]

export interface UserIface {
  username: string;
  password: string;
  role: number;
}

export const users: UserIface[] = [
  {
    username: 'user1',
    password: 'password1',
    role: 1,
  },
  {
    username: 'user2',
    password: 'password2',
    role: 2,
  },
];