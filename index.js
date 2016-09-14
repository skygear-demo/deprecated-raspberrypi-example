#!/usr/bin/env node

const skygear = require('skygear');
const endPoint = process.env.SKYGEAR_ENDPOINT;
const apiKey = process.env.SKYGEAR_APIKEY;
const username = process.env.SKYGEAR_USERNAME;
const password = process.env.SKYGEAR_PASSWORD;
const interval = 60;

console.log('Initializing health reporting');
console.log('Skygear endpoint: ', endPoint);
console.log('Skygear username: ', username);

function sendHealth() {
  console.log('Not implemented');
}


skygear.config({
  apiKey: apiKey,
  endPoint: endPoint
}).then(() => {
  console.log('Skygear initialized');
  skygear.signupWithUsername(username, password).then(() => {
    console.log('Sucessfully signup the devices');
    setInterval(sendHealth, interval);
  }, (err) => {
    console.log('Trying to login');
    skygear.loginWithUsername(username, password).then(() => {
      console.log('Sucessfully login');
      setInterval(sendHealth, interval);
    });
  });
});
