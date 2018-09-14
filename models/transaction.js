
// Creating our User model
module.exports = function(sequelize, DataTypes) {
  var Transaction = sequelize.define("Transaction", {
    // ticker:
    // { // the ticker symbol
    //   type: DataTypes.STRING,
    //   allowNull: false,
    //   unique: true
    // },
    quantity:{
      type: DataTypes.INTEGER,
      allowNull: false,
    }
  });
  // return our Transaction model.

  return Transaction;
};
