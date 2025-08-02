import { Router } from 'express';

const router = Router();

router.get('/health', (req: any, res: any) => {
  res.status(200).json({
    service: 'chat',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

router.post('/', (req: any, res: any) => {
  res.status(501).json({
    message: 'AI chat not implemented yet',
    todo: 'Implement GitHub AI API integration'
  });
});

export default router;
