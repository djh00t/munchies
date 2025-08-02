import { Router } from 'express';

const router = Router();

router.get('/health', (req: any, res: any) => {
  res.status(200).json({
    service: 'inventory',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

router.get('/', (req: any, res: any) => {
  res.status(501).json({
    message: 'Inventory management not implemented yet',
    todo: 'Implement CRUD operations for inventory items'
  });
});

router.post('/photo', (req: any, res: any) => {
  res.status(501).json({
    message: 'Photo processing not implemented yet',
    todo: 'Implement OCR and ingredient recognition'
  });
});

export default router;
