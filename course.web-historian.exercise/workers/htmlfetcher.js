// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');

archive.readListOfUrls((err, data) => {
    if (err) throw err
    data.forEach((datum) =>{
      archive.isUrlArchived(datum, (err, bool) => bool)

    })

})



exports.readListOfUrls = function(cb) {
  fs.readFile(exports.paths.list, function(err, data) {
    if (err) {return cb(err)}
    data = data.toString().split('\n')
    cb(null, data)
  });
};

exports.isUrlArchived = function(url, cb) {
  fs.exists(exports.paths.archivedSites + '/' + url, exists => cb(null, exists));
};
