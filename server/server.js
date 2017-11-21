require('./config/config');
var path = require('path');

const express = require('express');
const fs = require('fs');

const app = express();
const port = process.env.PORT;
const root = __dirname + '/../public/';

app.use(express.static(root));

app.listen(port, () => {
  console.log(`Server is listening on ${port}`);
});
