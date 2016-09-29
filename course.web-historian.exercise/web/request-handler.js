var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile('web/public/index.html', function(err, data) {
      if (err) {
        console.log("err", err)
        res.writeHead(500)
        res.end('Error: 500, couldn\'t find index.html, my fault')
      } else {
        console.log("data", data.toString())
        res.writeHead(200, helpers.headers)
        res.end(data)
      }
    });
  } else if (req.method === 'POST' && req.url === '/') {
    helpers.readBody(req, function(body) {
      archive.isUrlInList(body.url, function(err, exists) {
        if (!exists) {
          archive.addUrlToList(body.url, function(err, boolean) {
            if (err) {
              console.log("err", err)
              res.writeHead(500)
              res.end('Error: 500, couldn\'t find index.html, my fault')
            } else {
              res.writeHead(201)
              res.end()
            }
          })
        } else {
          res.writeHead(302)
          res.end()
        }
      })
    });

  } else {
    res.writeHead(404);
    res.end();
  }
  // res.end(archive.paths.list);
};
