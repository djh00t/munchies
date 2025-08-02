import { Router } from 'express';

const router = Router();

// Health check for auth service
router.get('/health', (req, res) => {
  res.status(200).json({
    service: 'auth',
    status: 'ok',
    timestamp: new Date().toISOString()
  });
});

// OAuth login routes (placeholder)
router.post('/login', (req, res) => {
  res.status(501).json({
    message: 'OAuth login not implemented yet',
    todo: 'Implement Google and Apple OAuth'
  });
});

// Logout route (placeholder)
router.post('/logout', (req, res) => {
  res.status(200).json({
    message: 'Logout successful'
  });
});

// Get current user (placeholder)
router.get('/me', (req, res) => {
  res.status(501).json({
    message: 'Get current user not implemented yet',
    todo: 'Implement JWT token validation and user retrieval'
  });
});

export default router;
