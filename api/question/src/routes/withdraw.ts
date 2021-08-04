import Express from 'express';
import { Question } from '../models/question';

const router = Express.Router();

router.post(
  '/api/question/:id/withdraw',
  async (req: Express.Request, res: Express.Response) => {
    const { id } = req.params;

    // delete the question from the database
    await Question.updateOne({}, { $pull: { questions: { _id: id } } });

    res.send(200);
  }
);

export { router as withdrawRouter };
