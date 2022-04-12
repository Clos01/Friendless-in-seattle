module.exports = function (sequelize, DataTypes) {
  const Interest = sequelize.define('Interest', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    interest_name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });

  Interest.associate = function (models) {
    Interest.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });
  };

  // Interest.associate = function (models) {
  //   Interest.hasMany(models.User, {
  //     foreignKey: 'interest_id'
  //   });
  // };

  Interest.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    return values;
  };

  return Interest;
};
