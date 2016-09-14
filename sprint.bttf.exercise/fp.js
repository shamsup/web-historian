function assert (actual, expected) {
  if ( expected !== actual ) {
    throw new Error(`Assertion Failed!\nExpected: ${expected}\nActual: ${actual}`)
  }
}

//
// Exercise #1: Abstraction
//
// Use find, filter, and map to abstract away all the
// tedious `for` loops in the following code.
//
// NOTE: See data.js for the actual data you are working with.
//


console.log("[Exercise #1]")

function findDominatingAliceGameScores () {

var findAlice = function(players) {
  return players.name === 'Alice';
}

// "Filter" function
var filterGamesAliceWon = function(games) {
  //console.log("games", games);
  return games.player1_id === alice.id && games.player1_score === 100
    || games.player2_id === alice.id && games.player2_score === 100
}

// "Map" function
var mapGamesAliceDominated = function(array) {
  return Math.abs(array.player1_score - array.player2_score);
}

// Additional "Filter" function
var filterDominatedGames = function(scoreDifference) {
      return scoreDifference >= 50;
};

var alice = Data.players.find(findAlice);
var aliceGames = Data.games.filter(filterGamesAliceWon);
var dominatedGames = aliceGames.map(mapGamesAliceDominated)
  .filter(filterDominatedGames);

return dominatedGames;
}

//
// Tests
//
var testRun = findDominatingAliceGameScores();
assert( testRun.length, 2 );
assert( testRun[0], 57 );
assert( testRun[1], 97 );
console.log("All good!");


////////////////////////////////////////////////////////////////////////////////////////////
//
// Exercise #2: Extract
//
// 1. Copy/paste your function down here and name it findDominatingAliceGameScores2.
//
// 2. Extract the callbacks you pass into map and filter into their own, curried functions.
//    You'll find a couple written for you.
//
// 3. Refactor your findDominatingAliceGameScores2 to use your new functions.
//
// NOTE: Feel free to use the solution code for the previous exercise.
//
// 4. Rename `hasName` to `propEq` and refactor it to be more flexible. Example use:
//
//      var hasNameAlice = propEq('name', 'Alice')
//      hasNameAlice({ id: 10, name: 'Alice' }) //=> true
//      hasNameAlice({ id: 11, name: 'Bob'   }) //=> false


// return filterDominatedGames(mapGamesAliceDominated(filterGamesAliceWon(findAlice(Data.players))))


function findDominatingAliceGameScores2 (data) {

}
//findDominatingAliceGameScores2(filterDominatedGames, mapGamesAliceDominated, filterGamesAliceWon, findAlice);


  // Next, find all games where alice won

  // Next, filter for dominating games and add differences

var findAlice = function(players) {
  return players.name === 'Alice';
}

// "Filter" function
var filterGamesAliceWon = function(games) {
  //console.log("games", games);
  return games.player1_id === alice.id && games.player1_score === 100
    || games.player2_id === alice.id && games.player2_score === 100
}

// "Map" function
var mapGamesAliceDominated = function(array) {
  return Math.abs(array.player1_score - array.player2_score);
}

// Additional "Filter" function
var filterDominatedGames = function(scoreDifference) {
      return scoreDifference >= 50;
};

function hasName (name) {
  return function (person) {
    return person.name === name;
  };
}

function propEq (prop) {
  return function (obj) {
    return obj.prop === prop;
  };
}

function isWinningGameFor (playerId) {
  return function (game) {
    return game.player1_id === playerId && game.player1_score === 100
        || game.player2_id === playerId && game.player2_score === 100;
  };
}

function toPlayerScoreDifference (game) {
  return Math.abs(game.player1_score - game.player2_score);
}

function greaterThanOrEqualTo (amount) {
  // TODO: Implement this function, curry-style.
}

console.log("[Exercise #2]")

var testRun2 = findDominatingAliceGameScores2();
assert( testRun2.length, 2 );
assert( testRun2[0], 57 );
assert( testRun2[1], 97 );
console.log("All good!");


//
// Exercise #3: Build
//
// WARNING: THIS IS A DIFFICULT TASK
//
// Write a function that returns the following type for a given clan id:
//
//   { clanId: Number, winCount: Number, strongWinCount: Number }
//
// where strongWinCount is any winning clan game with a point difference greater than 35.
//
// You should only calculate games that are against other clans,
// i.e. games that are not between two members of the given clan.
//

// Hint: This might be useful in your solution :)
Array.prototype.any = function (matchFn) {
  for (var i=0; i < this.length; i++) {
    var isMatch = matchFn(this[i]);
    if ( isMatch ) { return true; }
  }
  return false;
}

function clanStats (clanName) {
  // TODO: Implement this function.
  //       See if you can re-use a function or two from the previous exercise :)
}

// Helper function
function isMemberOfClan (clanId) {
  return function (playerId) {
    return !! Data.memberships.find( mem =>
      mem.player_id === playerId && mem.clan_id === clanId
    );
  }
}

console.log("[Exercise #3]");

var testRun3 = clanStats('Iron Rockstars');
assert( testRun3.clanId, 20 );
assert( testRun3.winCount, 15 );
assert( testRun3.strongWinCount, 11 );

var testRun4 = clanStats('24k Ninjas');
assert( testRun4.clanId, 21 );
assert( testRun4.winCount, 17 );
assert( testRun4.strongWinCount, 12 );
console.log("All good!");
