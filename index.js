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

app.get(
  '/:app/*',
  passport.authenticate('basic', { session: false }),
  (req, res) => {
    const app = apps[req.params.app] || false;
    console.log(app);
    if (app !== false) {
      res.sendFile(path.join(__dirname, 'apps', app, 'build', 'index.html'));
    } else {
      res.sendStatus(404);
    }
  }
);

app.listen(port, () => {
  console.log(`Listening on localhost:${port}`);
});
