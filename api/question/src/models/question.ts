import Mongoose from 'mongoose';

interface IQuestionArrayAttrs {
  name: string;
  vote: number;
  date: Date;
  context: string;
}

interface IQuestionAttrs {
  eventId: string;
  questions: [IQuestionArrayAttrs];
}

interface IQuestionDoc extends Mongoose.Document {
  eventId: string;
  questions: [IQuestionArrayAttrs];
}

interface IQuestionModel extends Mongoose.Model<IQuestionDoc> {
  build(attrs: IQuestionAttrs): IQuestionDoc;
}

const QuestionSchema = new Mongoose.Schema(
  {
    eventId: {
      type: String,
      required: true,
    },
    questions: [
      {
        name: {
          type: String,
          default: 'Anonymous',
        },
        vote: {
          type: Number,
          min: 0,
          default: 0,
        },
        date: {
          type: Date,
          required: true,
        },
        context: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { collection: 'questions' }
);

QuestionSchema.statics.build = (attrs: IQuestionAttrs) => {
  const { eventId } = attrs;
  const { questions } = attrs;

  const question = new Question();
  question.eventId = eventId;
  question.questions.push(questions[0]);

  return question;
};

const Question = Mongoose.model<IQuestionDoc, IQuestionModel>(
  'Question',
  QuestionSchema
);

export { Question, IQuestionArrayAttrs };
