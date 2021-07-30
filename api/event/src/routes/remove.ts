import Express from 'express';
import { BadRequestError } from '../errors/bad-request-error';

import { Event } from '../models/event';

const router = Express.Router();

router.post(
  '/api/event/:eventId/remove',
  async (req: Express.Request, res: Express.Response) => {
    const { userId } = req.body;
    const { eventId } = req.params;

    try {
      await Event.findOneAndUpdate(
        { userId },
        { $pull: { events: { eventId: eventId } } }
      );
    } catch (err) {
      return new BadRequestError('Event does not removed');
    }

    res.sendStatus(200);
  }
);

export { router as removeRouter };
