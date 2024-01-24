window.addEventListener('load', function(){
  const base = document.getElementById('baseContainer');
  const setValue = {
    baseWidth: 500,
    baseHeight: 500,
    dotWidth: 10,
    dotHeight: 10
  };
  let dots = [];


  function createDot(e){
    const posX = e.pageX;
    const posY = e.pageY;
    const dotX = Math.floor(posX / setValue.dotWidth) * setValue.dotWidth;
    const dotY = Math.floor(posY / setValue.dotHeight) * setValue.dotHeight;

    const instVal = dotX+', '+dotY;
    const duplicationCheck = dots.indexOf(instVal) > -1 ? true : false;
    console.log(dots.indexOf(instVal), dots);
    
    console.log(duplicationCheck);
    
    if (duplicationCheck === false) {
      dots.push(instVal);

      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.style.left = dotX+'px';
      dot.style.top = dotY+'px';

      base.append(dot);
      
    } else {
      // alert('중복');
			console.log('중복');
    }


    // base.append('<div class="dot" style="left:'+posX+'px;top:'+posY+'px;"></div>');
  }
  base.addEventListener('click', createDot);
});