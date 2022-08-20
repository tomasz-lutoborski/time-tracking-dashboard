//create express server
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

app.use(bodyParser.json());
app.use(cors());

//function to read the json file
function readFile(fileName) {
  return new Promise((resolve, reject) => {
    fs.readFile(fileName, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(JSON.parse(data));
      }
    });
  });
}

app.get('/', (req, res) => {
  readFile('data.json').then(data => {
    res.send(data);
  })
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});
