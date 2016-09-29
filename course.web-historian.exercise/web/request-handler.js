var path = require('path');
var archive = require('../helpers/archive-helpers');
var helpers = require('./http-helpers');
var fs = require('fs');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  if (req.method === 'GET' && req.url === '/') {
    fs.readFile('web/public/index.html', function(err, data) {
      helpers.endResponseWithContents(res, null, null, null, err, data);
    });
  } else if (req.method === 'POST' && req.url === '/') {
    helpers.readBody(req, function(body) {
      archive.isUrlInList(body.url, function(err, exists) {
        if (!exists) {
          archive.addUrlToList(body.url, function(err, boolean) {
            if (err) {
              console.log('err', err);
              res.writeHead(500);
              res.end('Error: 500, couldn\'t find index.html, my fault');
            } else {
              fs.readFile('web/public/loading.html', (err, data) => {
                helpers.endResponseWithContents(res, 201, null, null, err, data);
              });
            }
          });
        } else {
          archive.isUrlArchived(body.url, (err, exists) => {
            if (exists) {
              fs.readFile(archive.paths.archivedSites + '/' + body.url, (err, data) => {
                helpers.endResponseWithContents(res, null, 500, null, err, data);
              });
            } else {
              fs.readFile('./web/public/loading.html', (err, data) => {
                helpers.endResponseWithContents(res, null, 500, null, err, data);
              });
            }
          });
        }
      });
    });
  } else if (req.method === 'GET' && req.url === '/styles.css') {
    fs.readFile('web/public/styles.css', function(err, data) {
      helpers.endResponseWithContents(res, null, 'text/css', err, data);
    });
  } else if (req.method === 'GET') {
    var match = req.url.match(/^\/([^\/]*)/)[1];
    archive.isUrlInList(match, (err, exists) => {
      if (exists) {
        fs.readFile(archive.paths.archivedSites + '/' + match, (err, data) => {
          helpers.endResponseWithContents(res, null, 404, null, err, data);
        });
      } else {
        res.writeHead(404);
        res.end();
      }
    });
  } else {
    res.writeHead(404);
    res.end();
  }
};
