import { Router, Response, response } from 'express';
import axios, { AxiosError } from 'axios';
import { authenticate, LayananIface, AuthenticatedRequest } from './middleware/auth';

const router = Router();

router.use('/', authenticate, async (req: AuthenticatedRequest, res: Response) => {
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

