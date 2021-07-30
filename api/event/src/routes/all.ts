import Express from 'express';

import { Event, IEventArrayAttrs } from '../models/event';

const router = Express.Router();

router.post(
  '/api/event/all',
  async (req: Express.Request, res: Express.Response) => {
    const { userId } = req.body;

    const event = await Event.findOne({ userId });

    if (!event) {
      return res.send([]);
    }

    res.status(200).send(event.events);
  }
);

export { router as allRouter };
