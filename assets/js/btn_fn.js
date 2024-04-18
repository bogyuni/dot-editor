import { baseContainer } from "./setting.js";

export default btnFn;

function btnFn () {

  // 컨테이너 스케일 조절 값
  let scaleVal = 1;
  window.scaleRegulate = (pos) => {
    if (pos === 'up') {
      scaleVal += 0.1;
      baseContainer.style.scale = scaleVal;
    } else {
      if (scaleVal > 1) {
        scaleVal -= 0.1;
        baseContainer.style.scale = scaleVal;
      }
    }
    document.getElementById('sacleCurrent').innerText = scaleVal.toFixed(1);
  }

  // 메뉴 접기 펼치기
  const dtTag = document.querySelectorAll('dt');

  for (let i = 0; i < dtTag.length; i++) {
    dtTag[i].addEventListener('click', function(e) {
      if ( this.classList.contains('hidden') ) {
        this.classList.remove('hidden');
      } else {
        this.classList.add('hidden');
      }
    });
  }


  console.log('Module - button function loaded');
}