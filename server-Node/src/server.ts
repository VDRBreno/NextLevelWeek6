import express from 'express';

const app = express();

app.get('/oi', (req, res) => {
  return res.send('Olá')
});

app.listen(3333);