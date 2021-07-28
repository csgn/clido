import Express from 'express';

import axios from 'axios';

const router = Express.Router();

router.post(
  '/api/event/create',
  (req: Express.Request, res: Express.Response) => {}
);

export { router as createRouter };
