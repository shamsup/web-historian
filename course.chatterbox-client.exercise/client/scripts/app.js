// https://api.parse.com/1/classes/messages

var init = function () {
  $.ajax({
  url: 'https://api.parse.com/1/classes/messages',
  type: 'GET',
  data: {order: '-updatedAt'}
  })
  .then(function(responseData) {
    $('#chats').empty()
    console.log("responseData", responseData)
    var thisRoom = responseData.results.filter(function(item) {
      if (item.roomname === app.currentRoom) {
        return true
      } else return false
    })
    var chatsAsDomElem = _.map(thisRoom, function(item) {
      var $chat = $('<div class="chat"><span class="username"></span><p class="message"></p></div>')
      $chat.children('.username').text(item.username)
      $chat.children('.message').text(item.text)
      if (app.friends.indexOf(item.username) !== -1) {
        $chat.addClass('friend');
      }
      if (app.rooms.indexOf(item.roomname) === -1) {
        app.rooms.push(item.roomname)
      }
      return $chat
    })
    $('#chats').append(chatsAsDomElem)
  }).then(function () {
    $('.username').on('click', function (ev) {
      if(window.confirm('Add friend?')){
        app.friends.push($(this)[0].textContent);
        $($(this)[0]).parent().addClass('friend');
      }
    })
  });
}


var app = {
  init: init,
  friends: [],
  clearMessages: function () {
  },
  rooms: ['lobby'],
  currentRoom: 'lobby'
}

$(document).ready(function () {


$('#submit-button').on('click', function(ev) {
  ev.preventDefault()
  var message = {}
  var tempUsername = window.location.search.split('=')
  message.username = tempUsername[tempUsername.length - 1];
  message.text = document.getElementById("chat-input").value
  message.roomname = app.currentRoom
  $.ajax({
    url: 'https://api.parse.com/1/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json'
  }).then(init)
});

$('#submit-room-button').on('click', function(ev) {
  ev.preventDefault()
  var $select = $('<option></option>')
  // console.log("document.getElementById('chat-room-input').value", document.getElementById("submit-room-button"))
  var roomName = document.getElementById("room-input").value
  app.rooms.push(roomName)
  $select.text(roomName)
  console.log("roomName: ", roomName)
  $('select').append($select)
});

$('select').on('change', function(ev) {
  ev.preventDefault()
  app.currentRoom = $(ev.target).text()
  app.init()
});

app.init();

}); //end doc.ready
