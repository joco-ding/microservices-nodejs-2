import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

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


const layanans: LayananIface[] = [
  {
    path: '/api/login',
    url: 'http://localhost:3001/api/login',
    method: 'POST',
    role: [],
  },
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
    role: [1, 2],
  }
]

export const authenticate = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const endpoin = layanans.find((layanan) => layanan.method === req.method && layanan.path === req.originalUrl)
  if (!endpoin) {
    return res.status(404).json({ pesan: "Layanan tidak ditemukan" })
  }
  req.endpoin = endpoin

  let headers = {}
  if (req.method === 'POST') {
    headers = {
      ...headers,
      'content-type': 'application/json',
    }
  }

  if (endpoin.role.length === 0) {
    if (endpoin.path === '/api/login') {
      req.headers = { ...headers, authorization: secretKey }
    }
    next()
    return
  }
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ pesan: 'Tidak ada token yang diberikan' });
  }

  const [type, token] = authHeader.split(' ');

  if (type !== 'Bearer' || !token) {
    return res.status(401).json({ pesan: 'Token tidak valid' });
  }

  try {
    const decoded = jwt.verify(token, secretKey) as { username: string, role: number };
    if (!endpoin.role.includes(decoded.role)) {
      return res.status(403).json({ pesan: 'Akses tidak diperkenankan' });
    }
    req.headers = { ...headers, authorization: decoded.username }
    next();
  } catch (error) {
    return res.status(401).json({ pesan: 'Token tidak valid atau kadaluarsa' });
  }
};

