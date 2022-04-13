module.exports = function (sequelize, DataTypes) {
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    },
    conversation_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Conversations',
        key: 'id'
      }
    },
    message: {
      type: DataTypes.TEXT
    }
  }
  );

  Message.associate = function (models) {
    Message.belongsTo(models.Conversation);
  };

  Message.associate = function (models) {
    Message.belongsTo(models.User);
  };

  Message.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
  };

  return Message;
};
