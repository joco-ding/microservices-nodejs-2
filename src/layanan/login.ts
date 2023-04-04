import { Router, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const router = Router();

export const generateToken = (payload: object, secretKey: string): string => {
  return jwt.sign(payload, secretKey, { expiresIn: '1h' });
};

router.post('/', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ pesan: 'Username dan password harus diisi' });
  }

  interface UserIface {
    username: string;
    password: string;
    role: number;
  }


  const users: UserIface[] = [
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

  const user = users.find((user) => user.username === username && user.password === password);

  if (!user) {
    return res.status(401).json({ pesan: 'Username atau password salah' });
  }
  const payload = { username: user.username, role: user.role }

  const secretKey = req.headers.authorization || ''

  const token = generateToken(payload, secretKey);
  res.json({ token });
});

export default router;

