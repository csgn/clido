import Express from 'express';

import { Event, IEventArrayAttrs } from '../models/event';
import { BadRequestError } from '../errors/bad-request-error';

const router = Express.Router();

router.post(
  '/api/event/create',
  async (req: Express.Request, res: Express.Response) => {
    const { userId, eventName, startDate, endDate } = req.body;
    const eventId = Math.random().toString(36).substr(2, 6);

    const events: [IEventArrayAttrs] = [
      { eventName, startDate, endDate, eventId },
    ];

    let event = await Event.findOne({ userId });
    if (!event) {
      event = Event.build({ userId, events });

      if (!event) {
        throw new BadRequestError('Event was not created');
      }
    } else {
      event.events.push(...events);
    }
    try {
      await event.save();
    } catch (error) {
      return res.status(500).send({ error });
    }

    res.status(201).send({ eventId });
  }
);

export { router as createRouter };
