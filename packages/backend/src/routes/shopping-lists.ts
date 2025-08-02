import { Router } from 'express';

const router = Router();

router.get('/health', (req: any, res: any) => {
  res.status(200).json({
    service: 'shopping-lists',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

router.get('/', (req: any, res: any) => {
  res.status(501).json({
    message: 'Shopping lists not implemented yet',
    todo: 'Implement shopping list CRUD operations'
  });
});

export default router;
