'use strict';

const mongoose = require('mongoose');
const os = require('os');
const process = require('process');

const _SECONDS = 5000; // 5 seconds

// Count connections
const countConnect = () => {
  const numConnections = mongoose.connections.length;
  console.log(`Number of active connections: ${numConnections}`);
}

// Check overload
const checkOverload = () => {
  setInterval(() => {
    const numConnections = mongoose.connections.length;
    const numCores = os.cpus().length;
    const memoryUsage = process.memoryUsage().rss;
    const maxConnections = numCores * 5; // Example threshold based on CPU cores

    console.log(`Active Connections: ${numConnections}`);
    console.log(`Memory Usage: ${(memoryUsage / (1024 * 1024))} MB`);

    if (numConnections > maxConnections) {
      console.warn(`Warning: High number of connections (${numConnections}) exceeds threshold (${maxConnections})`);
    }

  }, _SECONDS); // Check every 5 seconds
}

module.exports = {
    countConnect,
    checkOverload
};