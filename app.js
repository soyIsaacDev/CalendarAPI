
var app = require('./index');
require('dotenv').config();
const { db } = require('./src/db')

const port = process.env.PORT;

app.listen(port, function () {
    console.log('Server is listening on port ' + port);
  
});
