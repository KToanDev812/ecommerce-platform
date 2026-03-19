'use strict';

const mongoose = require('mongoose');

const { db: { host, name, port } } = require('../configs/config.mongodb');

const connectString = process.env.MONGODB_URI || `mongodb://${host}:${port}/${name}`;

const { countConnect } = require('../helpers/check.connect');

class Database {
  constructor() {
    this.connect();
  }

  connect(type = 'mongodb') {

    mongoose.connect(connectString, {
      maxPoolSize: 50,
    })
      .then(() => {
        console.log('Database connection successful');
        countConnect();
      })
      .catch((err) => {
        console.error('Database connection error:', err);
      });
  }

  async disconnect() {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }

  static getInstance() {
    if (!Database.instance) {
      Database.instance = new Database();
    }

    return Database.instance;
  }
}

const instanceMongodb = Database.getInstance();

module.exports = instanceMongodb;