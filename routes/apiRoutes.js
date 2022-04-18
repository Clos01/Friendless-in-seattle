const router = require('express').Router();
const ensureAuthenticated = require('../middlewares/ensureAuthenticated');

module.exports = (passport, db) => {
  const AuthController = require('../controllers/authController')(passport, db);
  const AppController = require('../controllers/appController')(db);
  const UserController = require('../controllers/userController')(db);
  const InterestController = require('../controllers/interestController')(db);
  const ConversationController = require('../controllers/conversationController')(db);
  const MessageController = require('../controllers/messageController')(db);

  // Authentication
  router.post('/register', AuthController.register);
  router.post('/login', AuthController.login);
  router.get('/logout', AuthController.logout);
  router.put('/user/:id', ensureAuthenticated, AuthController.updateUser);
  router.delete('/user/:id', ensureAuthenticated, AuthController.deleteUser);
  router.post('/user/confirm', AuthController.confirmAuth);

  // User
  router.get('/users', UserController.getAllUsers);
  router.get('/users/:id', UserController.getUser);

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

  // Conversations
  router.get('/conversations', ConversationController.getAllConversations);
  router.get('/conversations/:id', ConversationController.getConversationsbyId);
  router.post('/conversations', ConversationController.createConversation);
  router.delete('/conversations/:id');

  // Messages
  router.get('/messages', MessageController.getAllMessages);
  router.get('/messages/:id');
  router.post('/messages', MessageController.createMessage);
  router.delete('/messages/:id', MessageController.deleteMessage);

  return router;
};
