#!/usr/bin/env node

const exec = require('child_process').exec;
const skygear = require('skygear');

const endPoint = process.env.SKYGEAR_ENDPOINT;
const apiKey = process.env.SKYGEAR_APIKEY;
const username = process.env.SKYGEAR_USERNAME;
const password = process.env.SKYGEAR_PASSWORD;
const interval = 60 * 1000;

console.log('Initializing health reporting');
console.log('Skygear endpoint: ', endPoint);
console.log('Skygear username: ', username);

const HealthModel = skygear.Record.extend('piHealth');

function sendHealth() {
  exec(`vcgencmd measure_temp`, (error, stdout, stderr) => {
    console.log('Temp', stdout);
    const h = new HealthModel({
      cpuTemp: stdout
    });
    skygear.privateDB.save(h);
  });
}


skygear.config({
  apiKey: apiKey,
  endPoint: endPoint
}).then(() => {
  console.log('Skygear initialized');
  skygear.signupWithUsername(username, password).then(() => {
    console.log('Sucessfully signup the devices');
    sendHealth();
    setInterval(sendHealth, interval);
  }, (err) => {
    console.log('Trying to login');
    skygear.loginWithUsername(username, password).then(() => {
      console.log('Sucessfully login');
      sendHealth();
      setInterval(sendHealth, interval);
    });
  });
});
