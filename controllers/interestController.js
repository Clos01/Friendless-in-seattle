module.exports = function (db) {
  return {
    getAllInterests: function (req, res) {
      db.Interest.findAll({
        include: [
          {
            model: db.User,
            attributes: [
              'id',
              'firstName',
              'lastName',
              'email',
              'location',
              'meetPreference',
              'about'
            ]
          }
        ]
      })
        .then(dbInterest => res.json(dbInterest))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    getInterest: function (req, res) {
      db.Interest.findOne({
        where: {
          id: req.params.id
        },
        include: [
          {
            model: db.User,
            attributes: [
              'id',
              'firstName',
              'lastName',
              'email',
              'location',
              'meetPreference',
              'about'
            ]
          }
        ]
      })
        .then(dbInterest => res.json(dbInterest))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    createInterest: function (req, res) {
      db.Interest.create({
        interest_name: req.body.interest_name
      })
        .then(dbInterest => res.json(dbInterest))
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    updateInterest: function (req, res) {
      db.Interest.update(
        {
          interest_name: req.body.interest_name
        },
        {
          where: {
            id: req.params.id
          }
        }
      )
        .then(dbInterest => {
          if (!dbInterest) {
            res.status(404).json({ message: 'No Interest found with this id' });
            return;
          }
          res.json(dbInterest);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    },
    deleteInterest: function (req, res) {
      db.Interest.destroy({
        where: {
          id: req.params.id
        }
      })
        .then(dbInterest => {
          if (!dbInterest) {
            res.status(404).json({ message: 'No Interest found with this id' });
            return;
          }
          res.json(dbInterest);
        })
        .catch(err => {
          console.log(err);
          res.status(500).json(err);
        });
    }
  };
};
