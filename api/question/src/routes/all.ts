import Express from 'express';
import { BadRequestError } from '../errors/bad-request-error';

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

router.post(
  '/api/question/:eventId/all/remove',
  async (req: Express.Request, res: Express.Response) => {
    const { eventId } = req.params;

    const question = await Question.deleteOne({ eventId });

    if (!question) {
      throw new BadRequestError(`Question not found for eventId: ${eventId}`);
    }

    res.status(200);
  }
);

export { router as allRouter };
