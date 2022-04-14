const router = require('express').Router();
const { Op } = require('sequelize');
module.exports = (db) => {
  // Load register page
  router.get('/register', (req, res) => {
    if (req.isAuthenticated()) {
      res.redirect('/profile');
    } else {
      db.Interest.findAll({ raw: true }).then(function (dbInterests) {
        res.render('register', { interests: dbInterests });
      });
    }
  });

  // Load profile page
  router.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
      db.User.findOne({
        where: {
          id: req.session.passport.user.id
        }
      }).then(() => {
        db.Interest.findAll({ raw: true }).then(function (dbInterests) {
          const profile = {
            userInfo: req.session.passport.user,
            isloggedin: req.isAuthenticated(),
            interests: dbInterests
          };
          res.render('profile', profile);
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Load friends page
  router.get('/friends', (req, res) => {
    if (req.isAuthenticated()) {
      db.User.findAll({ where: {
        firstName: {
          [Op.ne]: req.session.passport.user.firstName
        },
        interest_id: req.session.passport.user.interest_id
      },
      raw: true }).then(function (dbUsers) {
        const obj = {
          user: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          friends: dbUsers
        };
        res.render('friends', obj);
      });
    } else {
      res.redirect('/');
    }
  });

  router.get('/chat/:id', (req, res) => {
    if (req.isAuthenticated()) {
      db.Conversation.findOne({
        where: {
          id: req.params.id
        },
        attributes: [
          'id',
          'users'
        ],
        include: [
          {
            model: db.Message,
            attributes: ['id', 'message', 'createdAt', 'ConversationId', 'UserId'],
            include: {
              model: db.User,
              attributes: ['first_name']
            }
          }
        ]
      })
        .then(function (dbConversationData) {
          const obj = dbConversationData.get({ plain: true });
          res.render('chat', {
            obj,
            user: req.session.passport.user,
            isloggedin: req.isAuthenticated()
          });
        });
    } else {
      res.redirect('/');
    }
  });

  // Load dashboard page
  router.get('/', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('dashboard', user);
    } else {
      res.render('dashboard');
    }
  });

  // Load dashboard page
  router.get('/dashboard', (req, res) => {
    if (req.isAuthenticated()) {
      const user = {
        user: req.session.passport.user,
        isloggedin: req.isAuthenticated()
      };
      res.render('dashboard', user);
    } else {
      res.render('dashboard');
    }
  });

  // Load example index page
  router.get('/example', function (req, res) {
    if (req.isAuthenticated()) {
      db.Example.findAll({ where: { UserId: req.session.passport.user.id }, raw: true }).then(function (dbExamples) {
        res.render('example', {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          msg: 'Welcome!',
          examples: dbExamples
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Load example page and pass in an example by id
  router.get('/example/:id', function (req, res) {
    if (req.isAuthenticated()) {
      db.Example.findOne({ where: { id: req.params.id }, raw: true }).then(function (dbExample) {
        res.render('example-detail', {
          userInfo: req.session.passport.user,
          isloggedin: req.isAuthenticated(),
          example: dbExample
        });
      });
    } else {
      res.redirect('/');
    }
  });

  // Logout
  router.get('/logout', (req, res, next) => {
    req.logout();
    req.session.destroy((err) => {
      if (err) {
        return next(err);
      }
      res.clearCookie('connect.sid', { path: '/' });
      res.redirect('/');
    });
  });

  // Render 404 page for any unmatched routes
  router.get('*', function (req, res) {
    res.render('404');
  });

  return router;
};
