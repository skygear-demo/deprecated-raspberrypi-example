#!/usr/bin/env node
const skygear = require('skygear');

const endPoint = process.env.SKYGEAR_ENDPOINT;
const apiKey = process.env.SKYGEAR_APIKEY;
const username = process.env.SKYGEAR_USERNAME;
const password = process.env.SKYGEAR_PASSWORD;

const HealthModel = skygear.Record.extend('piHealth');

skygear.config({
  apiKey: apiKey,
  endPoint: endPoint
}).then(() => {
  console.log('Loging in to Skygear');
  skygear.loginWithUsername(username, password).then(() => {
    console.log('Sucessfully login');
    const q = new skygear.Query(HealthModel);
    q.addDescending('_created_at');
    skygear.privateDB.query(q).then((results) => {
      console.log('<Time> <cupTemp>');
      results.map((result) => {
        console.log(`<${result.createdAt}> <${result.cpuTemp}>`);
      });
      process.exit();
    }, (err) => {
      console.log('Fails to fetch device health');
      console.log(err);
    });
  });
});
