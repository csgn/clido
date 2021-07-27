import Express, { Request, Response } from 'express';
import { body } from 'express-validator';
import Jwt from 'jsonwebtoken';

import { BadRequestError } from '../errors/bad-request-error';

import { validateRequest } from '../middlewares/validate-request';

import { User } from '../models/user';
import { Password } from '../services/password';

const router = Express.Router();

router.post(
  '/api/auth/signin',
  [
    body('email').isEmail().withMessage('Email must be valid'),
    body('password')
      .trim()
      .notEmpty()
      .withMessage('You must supply a password'),
  ],
  validateRequest,
  async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      throw new BadRequestError('Invalid credentials');
    }

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      throw new BadRequestError('Invalid credentials');
    }

    // Generate JWT
    const existingUserJwt = Jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
      },
      process.env.JWT_KEY!
    );
    // Store it on session object
    req.session = {
      jwt: existingUserJwt,
    };

    res.status(200).send(existingUser);
  }
);

export { router as signinRouter };
