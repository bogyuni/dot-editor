import { colorisPliugin, dotColor, setValue, container, baseContainer, guideContainer, guideDot, createDot } from './setting.js';
import design from './design.js';
import print from './print.js';
import btnFn from './btn_fn.js';
import fileLoad from './fileload.js';

colorisPliugin();
design(setValue.baseWidth);
print();
btnFn();
fileLoad();

let insertKeyStatus = true; // 입력 모드 온오프 값
let mouseDrag = false; // 마우스 드래그 상태
let guideContainerStatus = true; // 가이드 컨테이너 온오프 값
let cellMoveStatus = true; // 가이드 커서 이동 가능
let movePaintStatus = false; // 무브 색칠 모드

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
  // 오류를 줄이기 위해, Math.round 로 변경
  // const dotIdText = 'L'+guideDot.offsetLeft.toString() + 'T'+guideDot.offsetTop.toString();
  const dLeft = Math.round(guideDot.offsetLeft);
  const dTop = Math.round(guideDot.offsetTop);
  const dotIdText = `L${dLeft}T${dTop}`;
  const thisCellNum = setValue.memory.get(dotIdText); // Map에서 바로 검색

  if (thisCellNum === -1) {
    console.warn(`[Error] 현재 위치 (${dotIdText})를 memory 배열에서 찾을 수 없음!`);
    console.warn(`메모리 배열 내용:`, setValue.memory);
  }

  // 키 입력 상태
  if (insertKeyStatus) {
    if (!setValue.memory.has(dotIdText)) {
      createDot(dLeft, dTop, dotColor.value);
      const dots = document.querySelectorAll('.container i')[setValue.count];
      setValue.memory.set(dotIdText, setValue.count);
      setValue.DOM.set(dotIdText, dots);
      setValue.count++;
    } else {
      // 기존 입력된 닷이면 색상변경
      setValue.DOM.get(dotIdText).style.backgroundColor = dotColor.value;
    }
  }
  // 키 삭제 상태
  else {
    if (setValue.memory.has(dotIdText)) {
      container.removeChild(setValue.DOM.get(dotIdText));
      setValue.memory.delete(dotIdText);
      setValue.DOM.delete(dotIdText);
      setValue.count--;
    } else {
      console.log('삭제할 대상이 없음');
    }
  }
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
  if (exceptionList.includes(char)) {
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

// 커서와 베이스 위치값 셋
const downMousePos = {x: 0, y: 0,}
const downBasePos = {x: 0, y: 0,}
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
baseContainer.onmouseup = () => {
  if (mouseDrag === true) {
    downMouseCheck = false;
    baseContainer.classList.add('grab');
    baseContainer.classList.remove('grabbing');
  }
}

// 마지막에 입력된 도트를 취소함
window.undo = () => {
  if (setValue.DOM.size > 0) {
    // 마지막 키 가져오기
    const lastKey = Array.from(setValue.DOM.keys()).pop();

    if (lastKey) {
      // 마지막 입력 도트 가져오기
      const lastDot = setValue.DOM.get(lastKey);

      // DOM에서 제거
      if (lastDot) container.removeChild(lastDot);

      // 메모리에서 해당 위치 제거
      setValue.memory.delete(lastKey);
      setValue.DOM.delete(lastKey);

      // 카운트 업데이트
      setValue.count--;
    }
  } else {
    alert('취소할 대상이 없음');
  }
}

// 모든 도트를 지우는 함수
window.deleteAll = () => {
  const confirmCheck = confirm('Really?');
  if (confirmCheck) {
    container.innerHTML = '';
    setValue.memory.clear();
    setValue.DOM.clear();
    setValue.count = 0;
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