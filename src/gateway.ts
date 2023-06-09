import { Router, Response } from 'express';
import axios, { AxiosError } from 'axios';
import { authenticate } from './middleware/auth';
import { AuthRequest, LayananIface } from './interface';

const router = Router();

router.use('/', authenticate, async (req: AuthRequest, res: Response) => {
  try {
    try {
      const endpoin = req.endpoin as LayananIface
      const response = await axios(endpoin.url, { method: endpoin.method, headers: req.headers, data: req.body });
      return res.json(response.data);
    } catch (error) {
      const err = error as AxiosError
      const status = err.response?.status || 500
      const payload = err.response?.data || { pesan: "layanan tidak dapat diakses" }
      return res.status(status).json(payload)
    }
  } catch (error) {
    res.status(500).json({ pesan: 'layanan tidak dapat diakses' });
  }
});

export default router;