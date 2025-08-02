import { Router } from 'express';

const router = Router();

router.get('/health', (req: any, res: any) => {
  res.status(200).json({
    service: 'recipes',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

router.get('/', (req: any, res: any) => {
  res.status(501).json({
    message: 'Recipe search not implemented yet',
    todo: 'Implement Spoonacular API integration'
  });
});

router.get('/suggestions', (req: any, res: any) => {
  res.status(501).json({
    message: 'Recipe suggestions not implemented yet',
    todo: 'Implement personalized suggestions based on inventory'
  });
});

export default router;
