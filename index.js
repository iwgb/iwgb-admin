require('dotenv').config();
const { env } = require('process');
const express = require('express');
const app = express();
const passport = require('passport');
const path = require('path');
const { BasicStrategy } = require('passport-http');
const apps = require('./apps');
const port = 3000;

passport.use(new BasicStrategy({}, (username, password, done) => done(
  null, username === env.DEV_USERNAME && password === env.DEV_PASSWORD
      ? { user: env.DEV_USERNAME }
      : false
)));

Object.keys(apps).forEach((appName) => {
  app.use(
    `/${appName}`,
    passport.authenticate('basic', { session: false }),
    express.static(path.join(__dirname, 'apps', apps[appName], 'build'))
  );
});

Object.keys(apps).forEach((appName) => {
  app.get(
    `/${appName}`,
    passport.authenticate('basic', { session: false }),
    (req, res) => {
      res.sendFile(path.join(__dirname, 'apps', apps[appName], 'build', 'index.html'));
    }
  );
});

app.listen(port, () => {
  console.log(`Listening on localhost:${port}`);
});
