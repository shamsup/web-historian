//
// The Data
//
// Scenario:
//   Players play a game up to 100 points.
//   Each player belongs to a single clan, represented by a membership.
//
// Difference from Core 4 Exercise:
//   Getting data is asynchronous. This emulates the asynchronicity you
//   would deal with when interacting with a database or an AJAX request.
//
window.DataAPI = (function () {

  var CallbackAPI = {};

  //
  // The "Easy API"
  //
  CallbackAPI.getAllGames = function (callback) {
    simulateNetworkRequest(games, callback);
  }

  CallbackAPI.getAllPlayers = function (callback) {
    simulateNetworkRequest(players, callback);
  }

  //
  // The "Realistic API"
  //
  CallbackAPI.getPlayerById = function (playerId, callback) {
    var player = players.find( p => p.id === playerId );
    simulateNetworkRequest(player, callback);
  };

  CallbackAPI.getPlayerGames = function (playerId, callback) {
    var pgames = games.filter( g => g.player1_id === playerId || g.player2_id === playerId );
    simulateNetworkRequest(pgames, callback);
  };


  //
  // The data in the "database"
  //
  var players = [
    { id: 10, name: 'Alice' },
    { id: 11, name: 'Bob'   },
    { id: 12, name: 'Carly' },
    { id: 13, name: 'Dan'   },
  ];

  var clans = [
    { id: 20, name: 'Iron Rockstars' },
    { id: 21, name: '24k Ninjas' },
  ];

  var memberships = [
    { clan_id: 20, player_id: 10 },
    { clan_id: 20, player_id: 13 },
    { clan_id: 21, player_id: 11 },
    { clan_id: 21, player_id: 12 },
  ];

  var games = [
    { id: 50, player1_id: 10, player2_id: 11, player1_score: 99,  player2_score: 100 },
    { id: 51, player1_id: 11, player2_id: 13, player1_score: 48,  player2_score: 100 },
    { id: 52, player1_id: 12, player2_id: 10, player1_score: 100, player2_score: 22  },
    { id: 53, player1_id: 13, player2_id: 11, player1_score: 100, player2_score: 57  },
    { id: 54, player1_id: 13, player2_id: 10, player1_score: 43,  player2_score: 100 },
    { id: 55, player1_id: 10, player2_id: 12, player1_score: 100, player2_score: 58  },
    { id: 56, player1_id: 11, player2_id: 10, player1_score: 77,  player2_score: 100 },
    { id: 57, player1_id: 10, player2_id: 13, player1_score: 22,  player2_score: 100 },
    { id: 58, player1_id: 13, player2_id: 12, player1_score: 47,  player2_score: 100 },
    { id: 59, player1_id: 12, player2_id: 13, player1_score: 100, player2_score: 76  },
    { id: 60, player1_id: 11, player2_id: 13, player1_score: 31,  player2_score: 100 },
    { id: 61, player1_id: 11, player2_id: 10, player1_score: 70,  player2_score: 100 },
    { id: 62, player1_id: 12, player2_id: 13, player1_score: 100, player2_score: 62  },
    { id: 63, player1_id: 12, player2_id: 11, player1_score: 26,  player2_score: 100 },
    { id: 64, player1_id: 10, player2_id: 13, player1_score: 1,   player2_score: 100 },
    { id: 65, player1_id: 12, player2_id: 10, player1_score: 100, player2_score: 34  },
    { id: 66, player1_id: 13, player2_id: 12, player1_score: 100, player2_score: 12  },
    { id: 67, player1_id: 11, player2_id: 13, player1_score: 100, player2_score: 52  },
    { id: 68, player1_id: 12, player2_id: 11, player1_score: 95,  player2_score: 100 },
    { id: 69, player1_id: 12, player2_id: 13, player1_score: 51,  player2_score: 100 },
    { id: 70, player1_id: 10, player2_id: 12, player1_score: 45,  player2_score: 100 },
    { id: 71, player1_id: 13, player2_id: 11, player1_score: 100, player2_score: 47  },
    { id: 72, player1_id: 10, player2_id: 12, player1_score: 71,  player2_score: 100 },
    { id: 73, player1_id: 10, player2_id: 12, player1_score: 28,  player2_score: 100 },
    { id: 74, player1_id: 10, player2_id: 13, player1_score: 100, player2_score: 67  },
    { id: 75, player1_id: 11, player2_id: 10, player1_score: 100, player2_score: 79  },
    { id: 76, player1_id: 12, player2_id: 11, player1_score: 45,  player2_score: 100 },
    { id: 77, player1_id: 11, player2_id: 12, player1_score: 84,  player2_score: 100 },
    { id: 78, player1_id: 11, player2_id: 13, player1_score: 100, player2_score: 64  },
    { id: 79, player1_id: 13, player2_id: 12, player1_score: 100, player2_score: 88  },
    { id: 80, player1_id: 12, player2_id: 11, player1_score: 100, player2_score: 32  },
    { id: 81, player1_id: 12, player2_id: 13, player1_score: 100, player2_score: 43  },
    { id: 82, player1_id: 12, player2_id: 11, player1_score: 43,  player2_score: 100 },
    { id: 83, player1_id: 13, player2_id: 11, player1_score: 100, player2_score: 85  },
    { id: 84, player1_id: 13, player2_id: 11, player1_score: 5,   player2_score: 100 },
    { id: 85, player1_id: 12, player2_id: 13, player1_score: 21,  player2_score: 100 },
    { id: 86, player1_id: 11, player2_id: 13, player1_score: 100, player2_score: 78  },
    { id: 87, player1_id: 11, player2_id: 12, player1_score: 71,  player2_score: 100 },
    { id: 88, player1_id: 13, player2_id: 11, player1_score: 100, player2_score: 56  },
    { id: 89, player1_id: 12, player2_id: 13, player1_score: 20,  player2_score: 100 },
    { id: 90, player1_id: 10, player2_id: 11, player1_score: 100, player2_score: 3   },
  ];


  return { Callback: CallbackAPI, Promise: promisify(CallbackAPI) };


  //
  // Exercise clockwork.
  // Unless you're curious, you can ignore this.
  //
  function simulateNetworkRequest (data, callback) {
    setTimeout(function () {
      callback( deepCopy(data) );
    }, rand(400, 900));
  }

  function promisify (api) {
    var result = {}
    Object.keys(api).forEach(function (method) {

      result[method] = function () {
        var args = Array.prototype.slice.call(arguments)
        return new Promise(function (resolve, reject) {
          args.push(resolve)
          api[method].apply(null, args)
        })
      }
    })

    return result
  }

  function deepCopy (subject) {
    if (
         subject === null
      || subject == undefined
      || typeof subject == 'number'
      || typeof subject == 'string'
      || typeof subject == 'boolean'
    ) {
      return subject
    }
    else if ( Array.isArray(subject) ) {
      return subject.map(deepCopy)
    }
    else {
      var obj = {}
      for (var prop in subject) {
        obj[prop] = deepCopy( subject[prop] )
      }
      return obj
    }
  }

  function rand (min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
})();

