import { Router, Request, Response } from 'express';

const router = Router();

router.get('/layanan-satu', async (req: Request, res: Response) => {
  res.json({ pesan: `Halo ini respon dari layanan satu! diakses oleh: ${req.headers.authorization}` });
});
router.get('/layanan-dua', async (req: Request, res: Response) => {
  res.json({ pesan: `Halo ini respon dari layanan dua! diakses oleh: ${req.headers.authorization}` });
});
export default router;

