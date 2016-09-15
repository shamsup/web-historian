function assert (actual, expected) {
  if ( expected !== actual ) {
    throw new Error(`Assertion Failed!\nExpected: ${expected}\nActual: ${actual}`)
  }
}

console.log("Delete this console log!")

//
// Exercise #1: Network Simulation
//
// Using the DataAPI.Callback "Easy API",
// implement playerStats to run the `callback` parameter with the following type:
//
// Array({ playerId: Number, playerName: String, winCount: Number })
//
// NOTE: See data.js for the actual data you are working with.
// HINT: Feel free to copy/paste any functions you used in Core 4 Exercise!
//

console.log("[Async Exercise #1]")

function playerStats (callback) {
  var API = DataAPI.Callback;

  API.getAllPlayers(function (players) {

    API.getAllGames(function (games) {

      var finalResults = players.map(function (player) {
        var winningGames = games.filter( isWinningGameFor(player.id) );
        return { playerId: player.id, playerName: player.name, winCount: winningGames.length };
      });

      callback(finalResults);
    });
      });
}


function isWinningGameFor (playerId) {
  return function (game) {
    return game.player1_id === playerId && game.player1_score === 100
        || game.player2_id === playerId && game.player2_score === 100;
  };
}


//
// Tests
//
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

console.log("[Async Exercise #2]")

function playerStats2 (playerIds, callback) {

  var API = DataAPI.Promise;

  // Grab both player data and player game data simultaneously.
  return Promise.all([
    Promise.all(
      playerIds.map( id => API.getPlayerById(id) )
    ),
    Promise.all(
      playerIds.map( id => API.getPlayerGames(id) )
    )
  ])
    .then(function (playersAndGames) {
      var players  = playersAndGames[0]
      var allGames = playersAndGames[1]

      // The rest of this is synchronous
      return players.map(function (player, i) {
        var playerGames  = allGames[i];
        var winningGames = playerGames.filter( isWinningGameFor(player.id) );
        return {
          playerId: player.id,
          playerName: player.name,
          winCount: winningGames.length,
        };
      });
    })
    .then(callback);
  }

playerStats2([10,11,12,13], function (stats) {
  assert( stats.length, 4 );

  assert( stats.find( s => s.playerId === 10 ).winCount, 6 );
  assert( stats.find( s => s.playerId === 11 ).winCount, 10 );
  assert( stats.find( s => s.playerId === 12 ).winCount, 12 );
  assert( stats.find( s => s.playerId === 13 ).winCount, 13 );
  console.log("[Async Exercise #2] All good!");
});


console.log("[Async Exercise #2.2]");
function playerStats2_callbacks (playerIds, callback) {
  var API = DataAPI.Callback;

  // Grab both player data and player game data simultaneously.
  var players     = {} // playerId: player
  var playerGames = {} // playerId: game

  playerIds.forEach(function (id) {

    API.getPlayerById(id, function (player) {
      players[id] = players;
      checkIfDone();
    });

    API.getPlayerGames(id, function (games) {
      playerGames[id] = games
      checkIfDone()
    });
  });

  function checkIfDone () {
    if (
         Object.keys(players).length === playerIds.length
      && Object.keys(playerGames).length === playerIds.length
    ) {
      console.log("Got all data!")
      console.log("players:", players)
      console.log("games:", playerGames)

      aggregate()
    }
  }

  function aggregate () {
    var finalResults = playerIds.map(function (id) {
      return {
        playerId: id,
        playerName: players[id].name,
        winCount: playerGames[id].filter( isWinningGameFor(id) ).length,
      }
    })

    callback(finalResults)
  }
}

playerStats2_callbacks([10,11,12,13], function (stats) {
  assert( stats.length, 4 );

  assert( stats.find( s => s.playerId === 10 ).winCount, 6 );
  assert( stats.find( s => s.playerId === 11 ).winCount, 10 );
  assert( stats.find( s => s.playerId === 12 ).winCount, 12 );
  assert( stats.find( s => s.playerId === 13 ).winCount, 13 );
  console.log("[Async Exercise #2.2] All good!");
});
