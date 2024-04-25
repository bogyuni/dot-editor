import {colorisPliugin, dotColor, setValue, container, baseContainer, guideContainer, createDot} from './setting.js';
import design from './design.js';
import print from './print.js';
import btnFn from './btn_fn.js';

colorisPliugin();
design(setValue.baseWidth);
print();
btnFn();

// 가이드 커서 이동 가능
let cellMoveStatus = true;
// 셀의 데이터
const cellMemory = [];
const cellDom = [];
let cellCount = 0;

// 마우스 입력/지우기 온오프 값
let insertMouseStatus = false;
// 키보드 입력 모드 온오프 값
let insertKeyStatus = true;
// 가이드 컨테이너 온오프 값
let guideContainerStatus = true;
// 가이드 커서 선택자
const guideDot = document.getElementById('guideDot');

// (마우스/키) 입력 모드, 삭제 모드로 변경
window.createMode = (mode) => {
  if (mode === 'mouse') {
    alert('마우스 기능 중지');
    return;
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
    //  container.removeChild(e.target);

      const dotIdText = e.target.offsetLeft.toString() + e.target.offsetTop.toString();

      console.log(
        dotIdText,
        e.target.offsetLeft.toString(),
        e.target.offsetTop.toString(),

        );

      // const dotIdText = guideDot.offsetLeft.toString() + guideDot.offsetTop.toString();
      const thisCellNum = cellMemory.indexOf(dotIdText);
      console.log(thisCellNum);

      // container.removeChild(container.children[thisCellNum]);
      // cellMemory.splice(thisCellNum, 1);
      // cellDom.splice(thisCellNum, 1);
      // cellCount--;


    // 도트가 아닌 대상을 클릭 하면 안내문구 출력
    } else {
      console.log('삭제 대상이 없습니다');
    }
  }
}

// 키보드 스페이스바 입력 함수
function insertKey() {
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

// 컨테이너 클릭할 때 마다 생성된 도트를 입력
/* 마우스 입력 기능 중지
  1. 효율성 떨어짐,
  2. 키 입력 모드와 상호 보완 스펙 추가, 1번의 이유로 진행 보류
  container.addEventListener('click', insertMouse);*/

// 키보드 입력 이벤트
window.onkeydown = (e) => {
  const key = e.key || e.keyCode;
  if (key === 'k') {
    createMode('key');
  } else if (key === 'm') {
    createMode('mouse');
  } else if (key === 'd') {
    createMode('delete');
  } else if (key === 'Escape') {
    guideDot.focus();
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
    // 스페이스 키 입력
    else if (key === ' ') {
      insertKey();
    }
    // 입력 셀 취소
    else if (key === 'Backspace' || key === 'Delete') {
      undo();
    }
  } else {
    console.log('Cell Move : false');
  }
};


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
    cellMemory = [];
    cellDom = [];
    cellCount = 0;
  }
}
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