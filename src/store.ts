import { LayananIface, UserIface } from "./interface";

export const secretKey = 'ini-kunci-rahasia';

export const semuaLayanan: LayananIface[] = [
  {
    path: '/api/layanan-satu',
    url: 'http://localhost:3001/layanan-satu',
    method: 'GET',
    role: [1],
  },
  {
    path: '/api/layanan-dua',
    url: 'http://localhost:3002/layanan-dua',
    method: 'GET',
    role: [1,2],
  },
  {
    path: '/api/login',
    url: 'http://localhost:3003/login',
    method: 'POST',
    role: [],
  }
]

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