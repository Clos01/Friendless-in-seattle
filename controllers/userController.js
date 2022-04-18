module.exports = function (db) {
  return {
    getAllUsers: function (req, res) {
      db.User.findAll({
        include: [
          {
            model: db.Conversation,
            through: db.UserToConversation,
            include: {
              model: db.Message
            }
          }
        ]
      })
        .then(dbMessageData => res.json(dbMessageData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    getUser: function (req, res) {
      db.User.findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: db.Conversation,
            through: db.UserToConversation,
            include: {
              model: db.Message
            }
          }
        ]
      })
        .then(dbMessageData => res.json(dbMessageData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  };
};
