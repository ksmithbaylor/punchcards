import express from 'express';
import punchcard from './punchcard';

const app = express();

app.use(express.static('dist'));

app.get('/d3.min.js', (req, res) =>
  res.sendFile('node_modules/d3/d3.min.js', {root: `${__dirname}/..`}));

app.get('/punchcard/:user?', (req, res) =>
  punchcard(req.params.user).then(result => res.json(result)));

app.listen(5555);
