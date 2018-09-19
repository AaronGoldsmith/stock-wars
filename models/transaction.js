// Creating our transaction model for when a user buys or sells a stock
module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define("Transactions", {
    userid: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    ticker:
    {
      type: DataTypes.STRING,
      allowNull: false
    },
    quantity:{
      type: DataTypes.INTEGER,
      allowNull: false
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    total_price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    }
  });
  // return our Transaction model.
  return Transaction;
};
