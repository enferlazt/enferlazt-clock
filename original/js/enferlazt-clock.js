;(function(){
  function EnferlaztClock(options){
    var elem = options.elem;

    do{
      var analogue_clock = elem.dataset.type == 1 || elem.dataset.type == 2 || elem.dataset.type == 3;
      var digital_clock = elem.dataset.type == 4;
      if(!analogue_clock && !digital_clock){
        elem.dataset.type = Math.floor(Math.random() * 4) + 1;
      }
    }while(!analogue_clock && !digital_clock)
    
    if(analogue_clock){
      var minutes = document.createElement('img');
      elem.appendChild(minutes);
      minutes.className = "minutes";
      var src = "../enferlazt-clock/img/enferlazt-minType-" + elem.dataset.type + ".png";
      minutes.src = src;
      
      var hours = document.createElement('img');
      elem.appendChild(hours);
      hours.className = "hours";
      src = "../enferlazt-clock/img/enferlazt-hourType-" + elem.dataset.type + ".png";
      hours.src = src;
      
      var seconds = document.createElement('img');
      elem.appendChild(seconds);
      seconds.className = "seconds";
      src = "../enferlazt-clock/img/enferlazt-secType-" + elem.dataset.type + ".png";
      seconds.src = src;
    }
    else if(digital_clock){
      elem.setAttribute('digital', '');

      var hours = document.createElement('span');
      elem.appendChild(hours);
      hours.className = "hours";
      
      var delimiter = document.createElement('span');
      elem.appendChild(delimiter);
      delimiter.className = "delimiter";
      elem.children[1].innerHTML = ':';

      var minutes = document.createElement('span');
      elem.appendChild(minutes);
      minutes.className = "minutes";
      
      var seconds = document.createElement('span');
      elem.appendChild(seconds);
      seconds.className = "seconds";
    }
    src = '../enferlazt-clock/img/enferlazt-clockType-' + elem.dataset.type + '.png';
    elem.style.backgroundImage = "url(" + src + ")";
    var location = elem.dataset.location;

    if(elem.dataset.map == 'enable'){
      var map = document.createElement('iframe');
      map.className = "enferlazt-map";
      map.src = "https://maps.google.com/maps?&width=170&amp;&height=170&amp;&hl=en&amp;&q=" + location + "&amp;&ie=UTF8&amp;&t=&amp;&z=3&amp;&iwloc=B&amp;&output=embed";
      map.dataset.frameborder = "no";
      map.style.display = 'none';
      elem.appendChild(map);
      elem.setAttribute('data-caption', 'enable');
    }

    if(elem.dataset.caption == 'enable'){
      var caption = document.createElement('p');
      caption.className = "enferlazt-clock-caption";
      var city = location.substr(location.lastIndexOf('/')+1);
      caption.innerHTML = city.replace(/_/g," ").split(/\s+/).map(function(word){ return word[0].toUpperCase() + word.substring(1)}).join(' ');
      var next = elem.nextSibling;
      elem.parentNode.insertBefore(caption, next);
    }


    var interval = setInterval(time);

    if(elem.dataset.map == 'enable'){
      caption.onclick = function(){
        map.style.display == 'none' ? show() : hide();
      }
    }

    function hide() {
      interval = setInterval(time);
      map.style.display = 'none';
      minutes.style.display = '';
      hours.style.display = '';
      seconds.style.display = '';
      if(digital_clock){
        delimiter.style.display = '';
      }
    }

    function show() {
      clearInterval(interval);
      map.style.display = 'block';
      minutes.style.display = 'none';
      hours.style.display = 'none';
      seconds.style.display = 'none';
      if(digital_clock){
        delimiter.style.display = 'none';
      }
    }
    
  	function time(){
      var d = moment().tz(location);
      if(analogue_clock){
  			var sec = 6 * +d.format('ss');
  			var min = 6 * (+d.format('mm') + (1/60) * +d.format('ss'));
  			var hour = 30 * (+d.format('HH') + (1/60) * +d.format('mm'));
  			elem.children[2].style.webkitTransform = 'rotateZ('+ sec +'deg)';
  			elem.children[0].style.webkitTransform = 'rotateZ('+ min +'deg)';
  			elem.children[1].style.webkitTransform = 'rotateZ('+ hour +'deg)';
  			elem.children[2].style.transform = 'rotateZ('+ sec +'deg)';
  			elem.children[0].style.transform = 'rotateZ('+ min +'deg)';
  			elem.children[1].style.transform = 'rotateZ('+ hour +'deg)';
      }
  		else if(digital_clock){
  			elem.children[0].innerHTML = d.format('HH');
  			elem.children[2].innerHTML = d.format('mm');
  			elem.children[3].innerHTML = d.format('ss');
      }
  	}
  }
  for(var i = 0; i < document.getElementsByClassName('enferlazt-clock').length; i++){
    new EnferlaztClock({
      elem: document.getElementsByClassName('enferlazt-clock')[i]
    })
  }
})();