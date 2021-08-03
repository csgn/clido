import Express from 'express';

import { Question } from '../models/question';

const router = Express.Router();

router.post(
  '/api/question/:eventId/:questionId/vote',
  (req: Express.Request, res: Express.Response) => {
    const { eventId, questionId } = req.params;
  }
);

export { router as voteRouter };
