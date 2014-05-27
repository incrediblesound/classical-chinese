var fs = require('fs');
var database = {};

exports.findIn = function(book, chars, cb) {
	var results;
	var data = database[book];
	getChars(data, chars, function(results) {
    return cb(results);
  });
};

exports.loadAll = function() {
  var books = Object.keys(lib);
  forEach(books, function (book) {
    lib[book](function (data) {
      database[book] = data.data;
    });
  });
};

exports.loadSome = function() {
 forEach(arguments, function (book) {
    lib[book](function (data) {
      database[book] = data.data;
    });
  });
};

exports.searchAll = function(chars, cb) {
  var results = {};
  var books = Object.keys(database);
  forEach(books, function (name) {
    book = database[name];
    getChars(book, chars, function (result) {
      results[name] = result;
    });
  });
  return cb(results);
};

exports.getText = function(text, chapter, cb) {
  var result = {title: chapter, body: []};
  forEach(database[text], function(section) {
    if(section.title == chapter) {
      result.body = section.body;
    }
  });
  return cb(result);	
};

exports.concordance = function(text, cb) {
  var results = {};
  forEach(database[text], function (part) {
    forEach(part.body, function (line) {
      forEach(line, function (character) {
        if(!(character in results)) {
          results[character] = [];
          results[character].push(line);
        } else {
          if(results[character].indexOf(line) == -1) {
            results[character].push(line);
          }
        }
      });
    });
  });
  return cb(results)
}

exports.getTitles = function(text, cb) {
  var result = [];
  forEach(database[text], function (section) {
    result.push(section.title);
  })
  return cb(result);
}

function forEach(array, fn) {
	for(var i = 0; i < array.length; i++) {
		fn(array[i], i);
	}
};

function getChars(data, chars, cb) {
	var results = [];
	var body;
	forEach(data, function (section) {
		body = section.body;
			forEach(body, function (line) {
				if(line.indexOf(chars) !== -1) {
				results.push({section: section.title, line: line});
			}
		});
	});
	if(results.length === 0) {
		results.push('No matches.')
	}
	return cb(results);
};

var lib = {
  laozi: function(cb) {
          fs.readFile('./node_modules/classical-chinese/laozi.json', function(err, data) {
          data = JSON.parse(data);
          cb(data);
          })
        },
  libai: function(cb) {
          fs.readFile('./node_modules/classical-chinese/libai.json', function(err, data) {
          data = JSON.parse(data);
          cb(data);
          })
        },
  dufu: function(cb) {
          fs.readFile('./node_modules/classical-chinese/dufu.json', function(err, data) {
          data = JSON.parse(data);
          cb(data);
          })
        },
  zhuangzi: function(cb) {
              fs.readFile('./node_modules/classical-chinese/zhuangzi.json', function(err, data) {
              data = JSON.parse(data);
              cb(data);
            })
            },
  lunyu: function(cb) {
            fs.readFile('./node_modules/classical-chinese/lunyu.json', function(err, data) {
            data = JSON.parse(data);
            cb(data);
          })
          },
  sunzi: function(cb) {
            fs.readFile('./node_modules/classical-chinese/sunzi.json', function(err, data) {
            data = JSON.parse(data);
            cb(data);
          })
        },
  mengzi: function(cb) {
            fs.readFile('./node_modules/classical-chinese/mengzi.json', function(err, data) {
            data = JSON.parse(data);
            cb(data);
          })
        }
};