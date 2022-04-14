module.exports = function (db) {
  return {
    getAllMessages: function (req, res) {
      db.Message.findAll({

      })
        .then(dbMessageData => res.json(dbMessageData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    getMessagesbyId: function (req, res) {
      db.Message.findOne({

      })
        .then(dbMessageData => res.json(dbMessageData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    createMessage: function (req, res) {
      db.Message.create({
        message: req.body.message,
        ConversationId: req.body.ConversationId,
        UserId: req.body.UserId
      })
        .then(dbMessageData => res.json(dbMessageData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    deleteMessage: function (req, res) {
      db.Message.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbMessageData => {
          if (!dbMessageData) {
            res.status(404).json({ message: 'No message found with this id' });
            return;
          }
          res.json(dbMessageData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  };
};
