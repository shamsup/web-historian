var fs = require('fs');
var path = require('path');
var _ = require('underscore');
var http = require('http');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(cb) {
  fs.readFile(exports.paths.list, function(err, data) {
    if (err) {return cb(err)}
    data = data.toString().split('\n')
    cb(null, data)
  });
};

exports.isUrlInList = function(url, cb) {
  exports.readListOfUrls(function(err, data) {
    if (err) return cb(err)
    if (!~data.indexOf(url)) {
      cb(null, false)
    } else cb(null, true)
  })
};

exports.addUrlToList = function(url, cb) {
  exports.readListOfUrls(function(err, data) {
    if (err) return cb(err)
    data.push(url)
    data = data.map((item) => item + (item ? '\n' : ''))
    console.log('data: ', data)
    fs.writeFile(exports.paths.list, data.join(''), function(err) {
      if (err) return cb(err)
      console.log('File saved!')
      cb(null, true)
    })
  })
};

exports.isUrlArchived = function(url, cb) {
  fs.exists(exports.paths.archivedSites + '/' + url, exists => cb(null, exists));
};

exports.downloadUrls = function(urlArray) {
    urlArray.forEach((datum) => {
      http.get('http://' + datum, (res) => {
        var responseBody = []
        res.on('data', (chunk) => {
          responseBody.push(chunk.toString())
        })
        res.on('end', () => {
          responseBody = responseBody.join('')
          fs.writeFile((exports.paths.archivedSites + '/' + url), responseBody, function(err) {
            if (err) throw err
          })
        })
      })
    })
};
