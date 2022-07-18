// import important parts of sequelize library
const { Model, DataTypes } = require('sequelize');
// const { values } = require('sequelize/types/lib/operators');
// import our database connection from config.js
const sequelize = require('../config/connection');
const Category = require('./Category');

// Initialize Product model (table) by extending off Sequelize's Model class
class Product extends Model {}

// set up fields and rules for Product model
Product.init(
  {
    //id` is a primary key, auto-incrementing, no null values
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true

    },
    // name` is a string, no null values
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // price` is a decimal, no null values. Validates that the value is a decimal.
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      validate: {
        isDecimal: true,
      }
    },
    // `stock` is a integer, default values 10. Validates that the value is an numeric.
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 10,
      validate: {
        isNumeric: true
      }
    },
    // `category_id` is a integer. references the category models id.
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Category',
        key: 'id',
      }
    }

  },
  {
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'product',
  }
);

module.exports = Product;
