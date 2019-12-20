require("@babel/register");
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  "development": {
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT,
    "operatorsAliases": process.env.OPERATORALIASES
  },
  "test": {
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT,
    "operatorsAliases": process.env.OPERATORALIASES
  },
  "prod": {
    "username": process.env.USERNAME,
    "password": process.env.PASSWORD,
    "database": process.env.DATABASE,
    "host": process.env.HOST,
    "dialect": process.env.DIALECT,
    "operatorsAliases": process.env.OPERATORALIASES
  }
}
