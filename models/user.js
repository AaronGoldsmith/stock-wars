// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines
var bcrypt = require("bcrypt-nodejs");
// Creating our User model
var Sequelize = require('sequelize');

module.exports = function (sequelize, DataTypes)
{
  var User = sequelize.define("User", {
    // The email cannot be null, and must be a proper email before creation
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isAlpha: true
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    initialCash: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 100000,
      validate: { min: 10, max: 1000001 } // max out at 100k
    },
    activeCash: {
      type: DataTypes.DECIMAL,
      allowNull: true,
      defaultValue: 0,
    }
  });

  //  Creating custom methods for our User model  

  /* 
    This will check if an unhashed password entered
    by the user can be compared to the hashed password stored in our database.
    Provided by password.js
  */
  User.prototype.validPassword = function (password)
  {
    return bcrypt.compareSync(password, this.password);
  };

  /*  defaults to false so that calling getFullName can render two ways. */
  User.prototype.getFullName = function (backward = false)
  {
    if (backward) {
      return [this.lastname, this.firstName].join(", ");
    } else {
      return [this.firstName, this.lastName].join(' ');
    }
  }

  User.prototype.purchaseStock = function (SYM)
  {
    // validate that there is enough money in their account
  }
  // Hooks are automatic methods that run during various phases of the User Model lifecycle
  // In this case, before a User is created, we will automatically hash their password
  User.hook("beforeCreate", function (user)
  {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  return User;
};
