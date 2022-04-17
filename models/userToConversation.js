module.exports = function (sequelize, DataTypes) {
  const UserToConversation = sequelize.define('UserToConversation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    }
  },
  {
    timeStamps: false
  });

  // UserToConversation.associate = function (models) {
  //   UserToConversation.belongsTo(models.User);
  // };

  // UserToConversation.associate = function (models) {
  //   UserToConversation.belongsTo(models.Conversation);
  // };

  UserToConversation.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
  };

  return UserToConversation;
};
