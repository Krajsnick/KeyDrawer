$(document).ready(function(){
  var left = 37,
      up = 38,
      right = 39;
      down = 40,
      penX = 400,
      penY = 300,
      speed = 1,
      $userlist = $('#userlist');

  var socket = io.connect(window.location.origin);

  socket.on('new-connection', function(data) {
    updateUserCount(data.userCount)
    console.log(data.userCount);
  });

  socket.on('user-disconnect', function(data) {
    updateUserCount(data.userCount)
    console.log(data.userCount);
  });

  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.moveTo(penX, penY);
    speed = 3;

    window.onkeydown = function(e){
      ctx.strokeStyle = 'rgb(255, 0, 0)';

      var startX = penX, startY = penY;

      switch (e.keyCode) {
      case left:
        penX -= speed;
        break;
      case right:
        penX += speed;
        break;
      case up:
        penY -= speed;
        break;
      case down:
        penY += speed;
        break;
      default:
        return;
      }

      socket.emit('paint', {x: penX, y: penY, startX: startX, startY: startY});
      ctx.lineTo(penX, penY);
      ctx.stroke();
    }

    socket.on('update-canvas', function(data) {
      ctx.strokeStyle = 'rgb(0, 0, 255)';
      ctx.moveTo(data.startX, data.startY);
      ctx.lineTo(data.x, data.y);
      ctx.moveTo(penX, penY);
      ctx.stroke();
    });
  }

  function updateUserCount(count) {
    $('#user-count').html("Connected: " + count);
  }

});
