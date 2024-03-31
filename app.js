const express = require('express');
const app = express();
const { API_KEY } = require('./config/api');
const indexRoute = require('./routes/index');

app.use(express.static('public'));
app.set('view engine', 'ejs');
app.use('/', indexRoute);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});