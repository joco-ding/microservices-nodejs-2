import {  Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthenticatedRequest, layanans, secretKey } from '../store';

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

