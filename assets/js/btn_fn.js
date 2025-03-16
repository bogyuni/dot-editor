import { dotColor, setValue, container, baseContainer, guideDot, createDot } from "./setting.js";

export default function btnFn () {
  // 컨테이너 스케일 조절 값
  let scaleVal = 2;
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
    document.getElementById('currentSacle').innerText = scaleVal.toFixed(1);
  }

  // 셋팅창 닫기/열기
  window.settingWindow = (target) => {
    if (document.querySelector('.util').classList.contains('off')) {
      document.querySelector('.util').classList.remove('off');
      target.innerText = 'Setting OFF';
    } else {
      document.querySelector('.util').classList.add('off');
      target.innerText = 'Setting ON';
    }
  }

  // 메뉴 접기 펼치기
  const secTit = document.querySelectorAll('h2');
  for (let i = 0; i < secTit.length; i++) {
    secTit[i].addEventListener('click', function(e) {
      if ( this.classList.contains('hidden') ) {
        this.classList.remove('hidden');
      } else {
        this.classList.add('hidden');
      }
    });
  }

  // 가이드 커서 리셋
  window.guideReset = () => {
    guideDot.style.top = '0px';
    guideDot.style.left = '0px';
  }

  // 컬러 픽커 찍는 함수
  window.openEyeDropper = () => {
    const resultElement = document.getElementById("result");

    if (!window.EyeDropper) {
      resultElement.textContent = "Your browser does not support the EyeDropper API";
      return;
    }

    const eyeDropper = new EyeDropper();
    eyeDropper
      .open()
      .then((result) => {
        resultElement.textContent = result.sRGBHex;
        resultElement.style.backgroundColor = result.sRGBHex;
        dotColor.value = result.sRGBHex;
      })
      .catch((e) => {
        resultElement.textContent = e;
      });
  }

  // 한가지 색상으로 모든 도트를 채우는 함수
  window.paintFull = () => {
    const confirmCheck = confirm('Really?');
    if (confirmCheck) {
      container.innerHTML = '';
      const dotW = setValue.dotSize;
      const dotH = setValue.dotSize;
      const rowMax = setValue.baseWidth / dotW;
      const colMax = setValue.baseHeight / dotH;
      for (let i = 0; i < colMax; i++) {
        for (let j = 0; j < rowMax; j++) {
          createDot(dotW*j, dotH*i, dotColor.value);
        }
      }
    }
  }

  // 컨테이너 배경 색 변경
  window.containerBgColor = (color) => {
    container.style.backgroundColor = color;
  }
}

console.log('Module loaded - Button function');
