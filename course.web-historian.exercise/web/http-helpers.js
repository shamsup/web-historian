var path = require('path');
var fs = require('fs');
var archive = require('../helpers/archive-helpers');

exports.headers = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10, // Seconds.
  'Content-Type': 'text/html'
};

exports.serveAssets = function(res, asset, callback) {
  // Write some code here that helps serve up your static files!
  // (Static files are things like html (yours or archived from others...),
  // css, or anything that doesn't change often.)
};

exports.readBody = function (req, cb) {
  var body = [];
  req.on('data', function (chunk) {
    body.push(chunk.toString());
  });
  req.on('end', function () {
    body = body.join('');
    body = body.split('\n');

    cb(body.reduce((obj, line) => {
      var keyVal = line.split('='); // => ['url', 'www.google.com']
      obj[keyVal[0]] = keyVal[1];
      return obj;
    }, {}));
  });
};

exports.endResponseWithContents = function(res, successCode, errCode, contentType, err, data) {
  contentType = contentType || 'text/html';
  errCode = errCode || 500;
  successCode = successCode || 200;
  if (err) {
    res.writeHead(errCode);
    res.end();
  } else {
    res.writeHead(successCode, { 'content-type': contentType });
    res.end(data);
  }
};

// As you progress, keep thinking about what helper functions you can put here!
