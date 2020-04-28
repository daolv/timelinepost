const express = require("express");
const upload = require("./upload");
const schedule = require('node-schedule');
const cors = require("cors");
const fs = require('fs');
const path = require('path');
const port = 8000;

const database = require("./database.json");

const server = express();
var corsOptions = {
  origin: "*",
  optionsSuccessStatus: 200
};

const readDataFromFile = () => {
  return database;
}

const pushItemToFile = (item) => {
  database.push(item);
  database.reverse();
  fs.writeFileSync('database.json', JSON.stringify(database));
}

const updateItemInFile = (item) => {
  let index = database.findIndex(s => s.id == item.id);
  database[index] = item;
  fs.writeFileSync('database.json', JSON.stringify(database));
}

server.use(cors(corsOptions));
server.use(express.static(__dirname + '/public'));

server.post('/upload', upload);

server.delete('/files', (req, res) => {
  let data = []
  req.on('data', chunk => {
    data.push(chunk)
  })
  req.on('end', () => {
    let image = JSON.parse(data),
      UPLOAD_FILES_DIR = path.resolve(__dirname, "../app/public") + "/",
      imagePath = UPLOAD_FILES_DIR + image.path;

    fs.unlink(imagePath, (err) => {
      if (err) {
        console.error(err)
        return
      }
    })
  });

});

server.get('/posts', (req, res) => {
  let data = readDataFromFile();
  res.send(JSON.stringify(data));
});

server.post('/posts', (req, res) => {
  let data = []
  req.on('data', chunk => {
    data.push(chunk)
  })
  req.on('end', () => {
    let post = JSON.parse(data);

    if (post.publishNow) {
      pushItemToFile(post);
      res.send(post);
    } else {
      let date = new Date(post.publishDate),
        hours = date.getHours(), mins = date.getMinutes(), secs = date.getSeconds(),
        dayofmonth = date.getDate(), month = date.getMonth() + 1, dayofweek = date.getDay();
      schedule.scheduleJob(`${secs} ${mins} ${hours} ${dayofmonth} ${month}  ${dayofweek}`, () => {
        pushItemToFile(post);
        res.send(post);
      })
    }
  })
});

server.put('/posts', (req, res) => {
  let data = []
  req.on('data', chunk => {
    data.push(chunk)
  })
  req.on('end', () => {
    let post = JSON.parse(data);
    post.publishedDate = new Date().toUTCString();
    post.published = true;
    updateItemInFile(post);
    res.send(post);
  })
});

server.listen(port, () => {
  console.log(`Server started on port ${port}! `);
});
