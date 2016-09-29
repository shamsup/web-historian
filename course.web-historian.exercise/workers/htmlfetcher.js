// Use the code in `archive-helpers.js` to actually download the urls
// that are waiting.
var archive = require('../helpers/archive-helpers');

archive.readListOfUrls((err, data) => {
  if (err) { throw err; }
  var checkCounter = 0;
  var urlArray = [];
  data.forEach((datum) =>{
    archive.isUrlArchived(datum, (err, bool) => {
      if (!bool) {
        urlArray.push(datum);
      }
      if (data.length === checkCounter) {
        archive.downloadUrls(urlArray);
      }
    });
  });

});
