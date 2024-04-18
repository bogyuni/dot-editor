import {colorisPliugin, setValue, container, baseContainer, guideContainer} from './setting.js';
import design from './design.js';
import print from './print.js';
import btnFn from './btn_fn.js';

colorisPliugin();
design(setValue.baseWidth);
print();
btnFn();

// coloris 플러그인의 인풋 선택자
const dotColor = document.getElementById('dotColor');

// 도트 칸을 지정하는 값
const dotCellX = document.getElementById('dotCellX');
const dotCellY = document.getElementById('dotCellY');
dotCellX.addEventListener('change', function(e) {
  setValue.dotCellX = e.target.value;
});
dotCellY.addEventListener('change', function(e) {
  setValue.dotCellY = e.target.value;
});

// 도트 생성 함수
function createDot(x, y, color) {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dot.style.left = x+'px';
  dot.style.top = y+'px';
  dot.style.backgroundColor = color;
  container.append(dot);
}

// 마우스 입력/지우기 온오프 값
let insertMouseStatus = true;
// 마우스 클릭 입력 함수
function insertMouse(e) {
  // 도트가 찍힐 위치값 지정
  const posX = e.offsetX;
  const posY = e.offsetY;
  const dotX = Math.floor(posX / setValue.dotSize) * setValue.dotSize;
  const dotY = Math.floor(posY / setValue.dotSize) * setValue.dotSize;

  // 도트 입력 상태일 때
  if (insertMouseStatus === true) {
    // 클릭 위치가 컨테이너일 때 즉 도트를 찍지 않았으면 도트를 생성
    if (e.target === container) {
      for (let i = 0; i < setValue.dotCellX; i++) {
        for (let j = 0; j < setValue.dotCellY; j++) {
          createDot(dotX + (setValue.dotSize * i), dotY + (setValue.dotSize * j), dotColor.value);
        }
      }
    // 도트를 찍었다면 해당 도트의 생삭을 변경한다
    } else {
      e.target.style.backgroundColor = dotColor.value;
    }
  // 도트 지우기 상태일 때
  } else {
    // 컨테이너를 클릭 하지 않은 상태 즉 도트를 클릭 했을 때만 해당 도트를 삭제
    if (e.target !== container) {
      container.removeChild(e.target);
    // 도트가 아닌 대상을 클릭 하면 안내문구 출력
    } else {
      console.log('삭제 대상이 없습니다');
    }
  }
}
// 컨테이너 클릭할 때 마다 생성된 도트를 입력
container.addEventListener('click', insertMouse);


// 마우스/키, 입력/삭제 모드로 변경
window.createMode = (mode) => {
  if (mode === 'mouse') {
    guideContainerStatus = false;
    guideContainer.style.display = 'none';
    cellMoveStatus = false;
    insertMouseStatus = true;
    insertKeyStatus = false;
    document.getElementById('status').innerText = 'Mouse Insert';
  } else if (mode === 'key') {
    guideContainerStatus = true;
    guideContainer.style.display = 'block';
    cellMoveStatus = true;
    insertMouseStatus = false;
    insertKeyStatus = true;
    document.getElementById('status').innerText = 'Key Insert';
  } else if (mode === 'delete') {
    cellMoveStatus = true;
    insertMouseStatus = false;
    insertKeyStatus = false;
    document.getElementById('status').innerText = 'Delete Mode';
  }
}
// 마지막에 입력된 도트를 취소함
window.undo = () => {
  if (container.lastChild){
    container.removeChild(container.lastChild);
    cellMemory.pop();
    cellDom.pop();
    cellCount--;
  } else {
    alert('취소 할 대상이 없음');
  }
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
// 모든 도트를 지우는 함수
window.deleteAll = () => {
  const confirmCheck = confirm('Really?');
  if (confirmCheck) {
    container.innerHTML = '';
    cellMemory = [];
    cellDom = [];
    cellCount = 0;
  }
}

// 키보드 입력 모드
let insertKeyStatus = false;
let cellMoveStatus = true;

let cellMemory = [];
let cellDom = [];
let cellCount = 0;

let guideContainerStatus = true;
const guideDot = document.querySelector('.guide-dot');

// input 입력 중엔 커서 정지
const inputTag = document.querySelectorAll('input');
for (let i = 0; i < inputTag.length; i++) {
  inputTag[i].addEventListener('focusin', function(e) {
    cellMoveStatus = false;
  });
  inputTag[i].addEventListener('focusout', function(e) {
    cellMoveStatus = true;
  });
}


window.onkeydown = (e) => {
  const key = e.key || e.keyCode;
  if (key === 'k') {
    createMode('key');
  } else if (key === 'm') {
    createMode('mouse');
  } else if (key === 'd') {
    createMode('delete');
  } else if (key === 'Escape') {
    document.getElementById('guideDot').focus();
  } else if (key === 'g') {
    if (guideContainerStatus === true) {
      guideContainer.style.display = 'none';
    } else {
      guideContainer.style.display = 'block';
    }
    guideContainerStatus = !guideContainerStatus;
  }

	// console.log(key);
  // cell move 인서트 모드
  if (cellMoveStatus === true) {
    if (key === 'ArrowUp') {
      guideDot.style.top = guideDot.offsetTop - setValue.dotSize + 'px';
    } else if (key === 'ArrowRight') {
      guideDot.style.left = guideDot.offsetLeft + setValue.dotSize + 'px';
    } else if (key === 'ArrowDown') {
      guideDot.style.top = guideDot.offsetTop + setValue.dotSize + 'px';
    } else if (key === 'ArrowLeft') {
      guideDot.style.left = guideDot.offsetLeft - setValue.dotSize + 'px';
    }
     // 스페이스 키 입력
    else if (key === ' ') {
      const dotIdText = guideDot.offsetLeft.toString() + guideDot.offsetTop.toString();
      const thisCellNum = cellMemory.indexOf(dotIdText);
      // 키 입력 상태
      if (insertKeyStatus === true) {
        if (cellMemory.includes(dotIdText) === false) {
          createDot(guideDot.offsetLeft, guideDot.offsetTop, dotColor.value);
          const dots = document.querySelectorAll('.dot')[cellCount];
          cellMemory[cellCount] = dotIdText;
          cellDom[cellCount] = dots;
          cellCount++;
        } else {
          cellDom[thisCellNum].style.backgroundColor = dotColor.value;
        }
      }
      // 키 삭제 상태
      else {
        if (cellMemory.includes(dotIdText) === true) {
          container.removeChild(container.children[thisCellNum]);
          cellMemory.splice(thisCellNum, 1);
          cellDom.splice(thisCellNum, 1);
          cellCount--;
        } else {
          console.log('삭제할 대상이 없음');
        }
      }
    }
  } else {
    console.log('Cell Move : false');
  }
};
