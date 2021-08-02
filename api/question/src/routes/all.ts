import Express from 'express';

import { Question } from '../models/question';

const router = Express.Router();

router.post(
  '/api/question/:eventId/all',
  async (req: Express.Request, res: Express.Response) => {
    const { eventId } = req.params;

    const question = await Question.findOne({ eventId });

    if (!question) {
      return res.send([]);
    }

    res.status(200).send(question.questions);
  }
);

export { router as allRouter };
