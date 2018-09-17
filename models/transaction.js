// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define("Transactions", {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ticker:
    { // the ticker symbol
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    quantity:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    total_price: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  });
  // return our Transaction model.

  return Transaction;
};
