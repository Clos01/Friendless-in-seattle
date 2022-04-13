module.exports = function (db) {
  return {
    getAllMessages: function (req, res) {
      db.Message.findAll({
          
      });
    }
  };
};
