import Mongoose from 'mongoose';

interface IEventArrayAttrs {
  eventName: string;
  startDate: Date;
  endDate: Date;
  eventId: string;
}

interface IEventAttrs {
  userId: string;
  events: [IEventArrayAttrs];
}

interface IEventDoc extends Mongoose.Document {
  userId: string;
  events: [IEventArrayAttrs];
}

interface IEventModel extends Mongoose.Model<IEventDoc> {
  build(attrs: IEventAttrs): IEventDoc;
}

const UserEventSchema = new Mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    events: [
      {
        eventName: {
          type: String,
          required: true,
        },
        startDate: {
          type: Date,
          required: true,
        },
        endDate: {
          type: Date,
          required: true,
        },
        eventId: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { collection: 'events' }
);

UserEventSchema.statics.build = (attrs: IEventAttrs) => {
  const event = new Event();
  event.userId = attrs.userId;
  event.events.push(attrs.events[0]);

  return event;
};

const Event = Mongoose.model<IEventDoc, IEventModel>('Event', UserEventSchema);

export { Event, IEventArrayAttrs };
