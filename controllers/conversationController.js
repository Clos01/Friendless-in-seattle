module.exports = function (db) {
  return {
    getAllConversations: function (req, res) {
      db.Conversation.findAll({
        attributes: [
          'id',
          'users'
        ]
      })
        .then(dbConversationData => res.json(dbConversationData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    },

    getConversationsbyId: function (req, res) {
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
        .then(dbConversationData => res.json(dbConversationData))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    },

    createConversation: function (req, res) {
      db.Conversation.create(req.body)
        .then((conversation) => {
          if (req.body.users.length) {
            const strToArr = req.body.users.split(',').map(Number);

            const usersInConversationArr = strToArr.map((UserId) => {
              return {
                UserId,
                ConversationId: conversation.id
              };
            });
            return db.UserToConversation.bulkCreate(usersInConversationArr);
          }
          res.status(200).json(conversation);
        })
        .then((userConvoIds) => res.status(200).json(userConvoIds))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    },

    deleteConversation: function (req, res) {
      db.Conversation.destroy({

      })
        .then(dbConversationData => {
          if (!dbConversationData) {
            res.status(404).json({ message: 'No Conversation found with this id' });
            return;
          }
          res.json(dbConversationData);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  };
};
