import Express from 'express';

import { Question, IQuestionArrayAttrs } from '../models/question';

import { BadRequestError } from '../errors/bad-request-error';

const router = Express.Router();

router.post(
  '/api/question/:eventId/create',
  async (req: Express.Request, res: Express.Response) => {
    const { userId, name, vote, date, context } = req.body;
    const { eventId } = req.params;

    const questions: [IQuestionArrayAttrs] = [
      { userId, name, vote, date, context },
    ];

    let question = await Question.findOne({ eventId });

    if (!question) {
      question = Question.build({
        eventId,
        questions,
      });

      if (!question) {
        throw new BadRequestError('Question was not created');
      }
    } else {
      question.questions.push(...questions);
    }

    try {
      await question.save();
    } catch (error) {
      return res.status(500).send({ error });
    }

    res.status(200).send({ questionId: question._id });
  }
);

export { router as createRouter };
