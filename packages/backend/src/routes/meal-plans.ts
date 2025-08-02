import { Router } from 'express';

const router = Router();

router.get('/health', (req: any, res: any) => {
  res.status(200).json({
    service: 'meal-plans',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

router.get('/', (req: any, res: any) => {
  res.status(501).json({
    message: 'Meal planning not implemented yet',
    todo: 'Implement meal plan CRUD operations'
  });
});

export default router;
