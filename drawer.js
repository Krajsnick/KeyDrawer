var left = 37,
    up = 38,
    right = 39;
    down = 40,
    penX = 400,
    penY = 300,
    speed = 1;

var canvas = document.getElementById('canvas');
if (canvas.getContext) {
  var ctx = canvas.getContext('2d');
  ctx.setStrokeColor(255, 0, 0, 1);
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

    ctx.lineTo(penX, penY);
    ctx.stroke();
  }
}
