$(document).ready(function(){
  var left = 37,
      up = 38,
      right = 39;
      down = 40,
      penX = 400,
      penY = 300,
      speed = 1;

  var socket = io.connect('http://localhost:3000');

  var canvas = document.getElementById('canvas');
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d');
    ctx.strokeStyle = 'rgb(255, 0, 0)';
    ctx.moveTo(penX, penY);
    speed = 3;

    window.onkeydown = function(e){
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

      socket.emit('paint', {x: penX, y: penY});
      ctx.lineTo(penX, penY);
      ctx.stroke();
    }
  }

});
