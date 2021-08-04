import Express from 'express';
import { BadRequestError } from '../errors/bad-request-error';

import { Event, IEventArrayAttrs } from '../models/event';

const router = Express.Router();

router.get('/api/event/:eventId', async (req, res) => {
  let event = [];

  event = await Event.aggregate([
    { $unwind: '$events' },
    { $match: { 'events.eventId': req.params.eventId } },
  ]);

  if (event.length === 0) {
    throw new BadRequestError(
      `Event with id '${req.params.eventId}' not found`
    );
  }

  res.status(200).send({ event: event[0].events });
});

export { router as getRouter };
