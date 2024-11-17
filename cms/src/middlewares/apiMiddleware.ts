import { Request, Response, NextFunction } from 'express';

const apiMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header is missing' });
  }

  const [slug, apiKeyLabel, apiKey] = authHeader.split(' ');

  if (apiKeyLabel !== 'API-Key' || !apiKey) {
    return res.status(401).json({ message: 'Invalid API key format' });
  }

  // Set x-api-key header for Payload CMS to handle authentication
  req.headers['x-api-key'] = apiKey;

  next();
};

export default apiMiddleware;
