const router = require('express').Router();
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

module.exports = (passport, db) => {
  const AuthController = require('../controllers/authController')(passport, db);
  const AppController = require('../controllers/appController')(db);
  const InterestController = require('../controllers/interestController')(db);

  // Authentication
  router.post('/register', AuthController.register);
  router.post('/login', AuthController.login);
  router.get('/logout', AuthController.logout);
  router.put('/user/:id', ensureAuthenticated, AuthController.updateUser);
  router.delete('/user/:id', ensureAuthenticated, AuthController.deleteUser);
  router.post('/user/confirm', AuthController.confirmAuth);

  // App
  router.get('/examples', AppController.getExamples);
  router.post('/examples', AppController.createExample);
  router.delete('/examples/:id', AppController.deleteExample);

  // Interests
  router.get('/interests', InterestController.getAllInterests);
  router.get('/interests/:id', InterestController.getInterest);
  router.post('/interests', InterestController.createInterest);
  router.put('/interests/:id', InterestController.updateInterest);
  router.delete('/interests/:id', InterestController.deleteInterest);
  return router;
};
