function assert (actual, expected) {
  if ( expected !== actual ) {
    throw new Error(`Assertion Failed!\nExpected: ${expected}\nActual: ${actual}`)
  }
}

// Exercise #1: Network Simulation
//
// Using the DataAPI.Callback "Easy API",
// implement playerStats to run the `callback` parameter with the following type:
//
// Array({ playerId: Number, playerName: String, winCount: Number })
//
// NOTE: See data.js for the actual data you are working with.
// HINT: Feel free to copy/paste any functions you used in Core 1 Exercise!
//

console.log("[Async Exercise #1]")

// var gamesWon = function ()

function playerStats (callback) { //Callback is playerStats
  var API = DataAPI.Callback;


  API.getAllPlayers(function (players) {


    API.getAllGames (function (games) {
      var gamesPlayersWon = [];
      for (var player = 0; player < players.length; player++) {
        var playerWonArray = [];
        playerWonArray = games.filter(isWinningGameFor(players[player].id));
        gamesPlayersWon.push({playerName: players[player].name, playerId: players[player].id, winCount: playerWonArray.length});
        }


      callback(gamesPlayersWon)
      })

    })
  }

playerStats(function (stats) {
  assert( stats.length, 4 );

  assert( stats.find( s => s.playerId === 10 ).winCount, 6 );
  assert( stats.find( s => s.playerId === 11 ).winCount, 10 );
  assert( stats.find( s => s.playerId === 12 ).winCount, 12 );
  assert( stats.find( s => s.playerId === 13 ).winCount, 13 );
  console.log("[Async Exercise #1] All good!");
});

//
// Exercise #2: Hard mode
//
// Using the DataAPI.Callback "Realistic API", re-implement the same functionality
// from Exercise #1, without using any of the "Easy API".
//
// You should use DataAPI.Promise instead of DataAPI.Callback. Example difference:
//
//    DataAPI.Callback.getPlayerById( player.id, function (player) {
//      // etc.
//    })
//
// --- VS ---
//
//    DataAPI.Promise.getPlayerById( player.id )
//      .then(function (player) {
//        // etc.
//      })
//
// The main benefit you would gain from using the DataAPI.Promise is
// the ability to take advantage of Promise.all.
//
// NOTE: Completing this exercise with DataAPI.Callback is extra credit.
//

//Array({ playerId: Number, playerName: String, winCount: Number })

console.log("[Async Exercise #2]")

function playerStats2 (playerIds, callback) {
  // var API = DataAPI.Callback;
  var API = DataAPI.Promise;
  console.log('playerIds: '+ playerIds)

  API.getPlayerById(playerId)
     .then(function (playerId) {
    var player = players.find( p => p.id === playerId );
    console.log("player", player);
    })
}

// playerStats2([10,11,12,13], function (stats) {
  playerStats2(10, function (stats) {
  assert( stats.length, 4 );

  assert( stats.find( s => s.playerId === 10 ).winCount, 6 );
  assert( stats.find( s => s.playerId === 11 ).winCount, 10 );
  assert( stats.find( s => s.playerId === 12 ).winCount, 12 );
  assert( stats.find( s => s.playerId === 13 ).winCount, 13 );
  console.log("[Async Exercise #2] All good!");
});




// ///////////////////////////

// function findDominatingAliceGameScores2 () {

//   var alice = Data.players.find( hasName('Alice') );

//   var dominating = Data.games
//     .filter( isWinningGameFor(alice.id) )
//     .map   ( toPlayerScoreDifference )
//     .filter( greaterThanOrEqualTo(50) );

//   return dominating;
//   }

// var hasName = function (name) {
//   return function (person) {
//     return person.name === name;
//   };
// }

var isWinningGameFor = function  (playerId) {
  return function (game) {
    return game.player1_id === playerId && game.player1_score === 100
        || game.player2_id === playerId && game.player2_score === 100;
  };
}

// function toPlayerScoreDifference (game) {
//   return Math.abs(game.player1_score - game.player2_score);
// }

// function greaterThanOrEqualTo (amount) {

//   return function (x) {
//     return x >= amount;
//   };
//   }



