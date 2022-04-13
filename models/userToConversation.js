module.exports = function (sequelize, DataTypes) {
  const UserToConversation = sequelize.define('UserToConversation', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    }
    // conversation_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'Conversations',
    //     key: 'id'
    //   }
    // },
    // user_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false,
    //   references: {
    //     model: 'Users',
    //     key: 'id'
    //   }
    // }
  },
  {
    timeStamps: false
  });

  UserToConversation.associate = function (models) {
    UserToConversation.belongsTo(models.User);
  };

  UserToConversation.associate = function (models) {
    UserToConversation.belongsTo(models.Conversation);
  };

  UserToConversation.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
  };

  return UserToConversation;
};
