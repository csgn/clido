import Express from 'express';

const router = Express.Router();

router.post('/api/auth/signout', (req, res) => {
  req.session = null;

  res.status(200).send({});
});

export { router as signoutRouter };
