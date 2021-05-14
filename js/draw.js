const pickr = Pickr.create({
    el: '#picker',
    theme: 'classic', // or 'monolith', or 'nano'

    swatches: [
        'rgb(255, 0, 0)',
        'rgb(255, 255, 0)',
        'rgb(0, 255, 0)',
        'rgb(0, 255, 255)',
        'rgb(0, 0, 255)',
        'rgb(255,0,255)',
        'rgb(255, 255, 255)',
        'rgb(0, 0, 0)'
    ],

    default: 'rgb(255,0,0)',

    components: {
        hue: true,
        interaction: {
            input: false,
        }
    }
});

$(document).ready(function(){
    var canvas = document.getElementById('canvas');
    var text_e = document.getElementById('submit-text');
    var submit_button = document.getElementById('submit-button');
    var clear_button = document.getElementById('clear-button');
    var colorSwatch = $('.pcr-button');
    var jq_can = $('#canvas');

    var empty_canvas = canvas.toDataURL();
    var ctx = canvas.getContext('2d');

    var canvasWidth = canvas.width;
    var canvasHeight = canvas.height;
    var brushWidth = 15;
    var fillColor = 'rgb(255,0,0)';

    pickr.on('change', function () {
        fillColor = pickr.getColor().toHEXA().toString();
        console.log("changing color to ");
        console.log(fillColor);
        console.log(colorSwatch);
        colorSwatch.css('color', fillColor);
    });

    clear_button.addEventListener('click', clearCanvas);
    submit_button.addEventListener('click', submitDrawing);
    jq_can.on('mousemove touchmove touchstart mousedown', paintCanvas);
    jq_can.on('mouseup', endBrushStroke);

    var prevX = -1;
    var prevY = -1;

    function endBrushStroke(e) {
      prevX = -1;
      prevY = -1;
    }

    function paintCanvas(e){
      e.preventDefault(); // Disables scrolling for touch events.
      var touchstart = e.type === 'touchstart' || e.type === 'touchmove';
      e = touchstart ? e.originalEvent : e;
      var rect = $("#canvas");
      var offsetX = touchstart ? e.targetTouches[0].pageX - rect.offset().left : e.offsetX;
      var offsetY = touchstart ? e.targetTouches[0].pageY - rect.offset().top : e.offsetY;
      if (e.which != 1 && !touchstart) return;
      ctx.beginPath();
      ctx.arc(offsetX, offsetY, brushWidth, 0, 2 * Math.PI, false);
      ctx.fillStyle = fillColor;
      ctx.fill();

      if( prevX > 0 && prevY > 0 ) {
        console.log(prevX, prevY);

        ctx.beginPath();
        ctx.moveTo(prevX, prevY);
        ctx.lineTo(offsetX, offsetY);
        ctx.lineWidth = brushWidth*2;
        ctx.strokeStyle = fillColor;
        ctx.stroke()
      }

      prevX = offsetX;
      prevY = offsetY;
      
    }


    function clearCanvas() {
      prevX = -1;
      prevY = -1;
      ctx.clearRect(0,0,canvasWidth,canvasHeight);
      text_e.value = '';
    }

    
    function submitDrawing() {
      let data_url = canvas.toDataURL();

      let text = text_e.value;

      if( data_url === empty_canvas ) return;
      
      if( text === '' ) {
        alert("please enter a title");
        return;
      }

      var link = document.createElement('a');
      link.download = text.replace(" ", "") + ".png";
      link.href = data_url;
      link.click();

    }
})
