#!/usr/bin/env node

const skygear = require('skygear');
const endPoint = process.env.SKYGEAR_ENDPOINT;
const apiKey = process.env.SKYGEAR_APIKEY;
const username = process.env.SKYGEAR_USERNAME;
const password = process.env.SKYGEAR_PASSWORD;

console.log('Initializing health reporting');
console.log('Skygear endpointi: ', endPoint);
console.log('Skygear username: ', username);

skygear.config({
  apiKey: apiKey,
  endPoint: endPoint
}).then(() => {
  console.log('Skygear initialized');
});
