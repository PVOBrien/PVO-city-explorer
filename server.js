'use strict';

const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
app.use(cors());

app.use(express.static('./public')); // TODO: Remember the . DOT! otherwise it's looking for a file not a path to folder.

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`listening to ${PORT}`);
});
