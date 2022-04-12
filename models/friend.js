module.exports = function (sequelize, DataTypes) {
  const Friend = sequelize.define('Friend', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    },
    friend_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'User',
        key: 'id'
      }
    }
  });

  Friend.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
  };

  return Friend;
};
