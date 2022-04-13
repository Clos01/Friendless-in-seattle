module.exports = function (sequelize, DataTypes) {
  const Conversation = sequelize.define('Conversation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    users: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Conversation.associate = function (models) {
    Conversation.hasMany(models.UserToConversation);
  };

  Conversation.associate = function (models) {
    Conversation.hasMany(models.Message);
  };

  Conversation.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
  };

  return Conversation;
};
