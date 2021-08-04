import Express from 'express';
import { BadRequestError } from '../errors/bad-request-error';

import { Question } from '../models/question';

const router = Express.Router();

router.post(
  '/api/question/:questionId/vote',
  async (req: Express.Request, res: Express.Response) => {
    await Question.updateOne(
      { 'questions._id': req.params.questionId },
      { $push: { 'questions.$.vote': { userId: req.body.userId } } }
    ).catch((err) => {
      throw new BadRequestError(err.message);
    });

    res.sendStatus(200);
  }
);

router.post(
  '/api/question/:questionId/unvote',
  async (req: Express.Request, res: Express.Response) => {
    await Question.updateOne(
      { 'questions._id': req.params.questionId },
      { $pull: { 'questions.$.vote': { userId: req.body.userId } } }
    ).catch((err) => {
      throw new BadRequestError(err.message);
    });

    res.sendStatus(200);
  }
);

export { router as voteRouter };
