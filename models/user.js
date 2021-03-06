const bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    firstName: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'User already exists'
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING
    },
    meetPreference: {
      type: DataTypes.STRING
    },
    about: {
      type: DataTypes.STRING
    },
    interest_id: {
      type: DataTypes.INTEGER,
      reference: {
        model: 'Interest',
        key: 'id'
      }
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {
    timestamps: true,
    underscored: true,
    hooks: {
      beforeValidate: function (user) {
        if (user.changed('password')) {
          return bcrypt.hash(user.password, 10).then((password) => {
            user.password = password;
          });
        }
      }
    }
  });

  User.associate = function (models) {
    User.hasMany(models.Example, {
      onDelete: 'cascade'
    });
  };

  User.associate = function (models) {
    User.belongsTo(models.Interest, {
      foreignKey: 'interest_id',
      onDelete: 'cascade'
    });
  };

  User.associate = function (models) {
    User.hasMany(models.Message);
  };

  User.associate = function (models) {
    User.belongsToMany(models.Conversation, {
      through: models.UserToConversation
    })
  };

  // This will check if an unhashed password can be compared to the hashed password stored in our database
  User.prototype.validPassword = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  // Compares passwords
  User.prototype.comparePasswords = function (password, callback) {
    bcrypt.compare(password, this.password, (error, isMatch) => {
      if (error) {
        return callback(error);
      }
      return callback(null, isMatch);
    });
  };

  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());
    delete values.password;
    return values;
  };

  return User;
};
