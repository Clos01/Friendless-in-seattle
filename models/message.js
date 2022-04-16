module.exports = function (sequelize, DataTypes) {
  const Message = sequelize.define('Message', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    // currentChatReceiverId: {
    //   type: DataTypes.INTEGER,
    //   allowNull: false
    // },
    message: {
      type: DataTypes.STRING
    }
  }
  );

  Message.associate = function (models) {
    Message.belongsTo(models.User);
  }; //switched

  Message.associate = function (models) {
    Message.belongsTo(models.Conversation);
  };

  Message.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
  };

  return Message;
};
