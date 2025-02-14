import { colorisPliugin, dotColor, setValue, container, baseContainer, guideContainer, guideDot, createDot } from './setting.js';
import design from './design.js';
import print from './print.js';
import btnFn from './btn_fn.js';
import dotLoad from './dot_load.js';

colorisPliugin();
design(setValue.baseWidth);
print();
btnFn();
dotLoad();

// 셀의 데이터
// const cellMemory = [];

console.log(setValue.memory);

const cellMemory = [];
cellMemory.push(setValue.memory);

const cellDom = [];
let cellCount = 0;

// 입력 모드 온오프 값
let insertKeyStatus = true;
// 마우스 드래그 상태
let mouseDrag = false;
// 가이드 컨테이너 온오프 값
let guideContainerStatus = true;
// 가이드 커서 이동 가능
let cellMoveStatus = true;
// 무브 색칠 모드
let movePaintStatus = false;
// 현재 상태 확인
const statusText = document.getElementById('status');
// 입력 모드, 이동 모드, 삭제 모드로 변경
window.createMode = (mode) => {
  if (mode === 'key') {
    insertKeyStatus = true;
    movePaintStatus = false;
    statusText.innerText = 'Insert paint mode';
  } else if (mode === 'move') {
    insertKeyStatus = true;
    movePaintStatus = true;
    statusText.innerText = 'Move paint mode';
  } else if (mode === 'delete') {
    insertKeyStatus = false;
    movePaintStatus = false;
    statusText.innerText = 'Delete mode';
  }
}

// 키보드 입력 함수
function insertKey () {
  const dotIdText = 'L'+guideDot.offsetLeft.toString() + 'T'+guideDot.offsetTop.toString();
  const thisCellNum = cellMemory.indexOf(dotIdText);
  // 키 입력 상태
  if (insertKeyStatus === true) {
    if (cellMemory.includes(dotIdText) === false) {
      createDot(guideDot.offsetLeft, guideDot.offsetTop, dotColor.value);
      const dots = document.querySelectorAll('.container i')[cellCount];
      // cellMemory[cellCount] = dotIdText;
      cellMemory.push(dotIdText);
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
  setValue.memory = cellMemory;
  console.log(setValue.memory);
}

// 가이드 온/오프 함수
function guideMode () {
  if (guideContainerStatus === true) {
    guideContainer.classList.add('none-back');
  } else {
    guideContainer.classList.remove('none-back');
  }
  guideContainerStatus = !guideContainerStatus;
}

// 키보드 입력 이벤트
window.onkeydown = (e) => {
  const key = e.key || e.keyCode;

  if (isEnglish(key) === false){
    statusText.innerText = '영문이 아닙니다.';
    statusText.classList.add('error');
  } else {
    statusText.classList.remove('error');
  }

  if (key === 'i') {
    createMode('key');
  } else if (key === 'm') {
    createMode('move');
  } else if (key === 'd') {
    createMode('delete');
  } else if (key === 'Escape') {
    guideReset();
  } else if (key === 'g') {
    guideMode();
  } else if (key === 'o') {
    designMode();
  } else if (key === '+' || key === '=') {
    scaleRegulate('up');
  } else if (key === '-' || key === '_') {
    scaleRegulate('down');
  } else if (key === 'c') {
    openEyeDropper();
  } else if (key === ' ') {
    mouseDrag = true;
    baseContainer.classList.add('grab');
  }

  // cell move 인서트 모드
  if (cellMoveStatus === true) {
    // 방향키 입력 ↑ → ↓ ←
    if (key === 'ArrowUp') {
      guideDot.style.top = guideDot.offsetTop - setValue.dotSize + 'px';
    } else if (key === 'ArrowRight') {
      guideDot.style.left = guideDot.offsetLeft + setValue.dotSize + 'px';
    } else if (key === 'ArrowDown') {
      guideDot.style.top = guideDot.offsetTop + setValue.dotSize + 'px';
    } else if (key === 'ArrowLeft') {
      guideDot.style.left = guideDot.offsetLeft - setValue.dotSize + 'px';
    }
    // 도트 입력
    else if (key === 'a') {
      insertKey();
    }
    // 입력 셀 취소
    else if (key === 'Backspace' || key === 'Delete') {
      undo();
    }
    // 무브 페인트 입력
    if (movePaintStatus === true && (key === 'ArrowUp' || key === 'ArrowRight' || key === 'ArrowDown' || key === 'ArrowLeft')) {
      insertKey();
    }
  } else {
    console.log('Cell Move : false');
  }

  
};

/**
 * 영문입력 모드 확인하는 함수
 * @param {string} char 입력받은 키값
 * @returns 특문은 예외처리하고, 영문이 아닐 때는 체크하여 status에 안내한다.
 */
function isEnglish(char) {
  const exceptionList = ['-', '=', '_', '+', ' '];
  if (exceptionList.indexOf(char) > -1) {
    return;
  }
  const code = char.charCodeAt(0);
  return ((code >= 65 && code <= 90) || (code >= 97 && code <= 122)); // A-Z and a-z range
}

// 키 업 이벤트
window.onkeyup = (e) => {
  const key = e.key || e.keyCode;
  if (key === ' ') {
    mouseDrag = false;
    baseContainer.classList.remove('grab');
    baseContainer.classList.remove('grabbing');
  }
}

// down mouse point 
const downMousePos = {
  x: 0,
  y: 0,
}
const downBasePos = {
  x: 0,
  y: 0,
}
let downMouseCheck = false;

// 베이스 드래그 기능
baseContainer.onmousedown = (e) => {
  if (mouseDrag === true) {
    downMouseCheck = true;
    downMousePos.x = e.clientX;
    downBasePos.x = baseContainer.offsetLeft;
    downMousePos.y = e.clientY;
    downBasePos.y = baseContainer.offsetTop;
    baseContainer.classList.remove('grab');
    baseContainer.classList.add('grabbing');
  }
}
baseContainer.onmousemove = (e) => {
  if (mouseDrag === true && downMouseCheck === true) {
    const setLeft = e.clientX - downMousePos.x + downBasePos.x;
    const setTop = e.clientY - downMousePos.y + downBasePos.y;
    baseContainer.style.left = setLeft+'px';
    baseContainer.style.top = setTop+'px';
  }
}
baseContainer.onmouseup = (e) => {
  if (mouseDrag === true) {
    downMouseCheck = false;
    baseContainer.classList.add('grab');
    baseContainer.classList.remove('grabbing');
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

// 모든 도트를 지우는 함수
window.deleteAll = () => {
  const confirmCheck = confirm('Really?');
  if (confirmCheck) {
    container.innerHTML = '';
    cellMemory.length = 0;
    cellDom.length = 0;
    cellCount = 0;
  }
}

// input 입력 중엔 커서 정지
const inputTag = document.querySelectorAll('input');
for (let i = 0; i < inputTag.length; i++) {
  inputTag[i].addEventListener('focusin', () => {
    cellMoveStatus = false;
  });
  inputTag[i].addEventListener('focusout', () => {
    cellMoveStatus = true;
  });
}