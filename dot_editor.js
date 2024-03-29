// 컬러픽커 플러그인 설정
Coloris({
  el: '.coloris',
});
Coloris.setInstance('.coloris', {
  theme: 'pill',
  themeMode: 'dark',
  formatToggle: true,
  closeButton: true,
  clearButton: true,
  swatches: [ '#067bc2', '#84bcda', '#80e377', '#ecc30b', '#f37748', '#d56062' ]
});

// 도트 컨테이너
const container = document.getElementById('container');
const containerGuide = document.getElementById('containerGuide');
// 초기 설정 값
const setValue = {
  baseWidth: 300,
  baseHeight: 300,
  dotWidth: 10,
  dotHeight: 10,
  dotCellX: 1,
  dotCellY: 1,

};
// 도트 입력 / 지우기 온오프 값
let dotStatus = true;
// 키보드 입력 모드
let cellMoveStatus = false;

// 컨테이너 사이즈 조정을 위한 인풋 선택자
const setWidth = document.getElementById('setWidth');
const setHeight = document.getElementById('setHeight');

setWidth.addEventListener('change', function(e) {
  setValue.baseWidth = e.target.value;
  container.style.width = `${setValue.baseWidth}px`;
  containerGuide.style.width = `${setValue.baseWidth}px`;
});
setHeight.addEventListener('change', function(e) {
  setValue.baseHeight = e.target.value;
  container.style.height = `${setValue.baseHeight}px`;
  containerGuide.style.height = `${setValue.baseHeight}px`;
});

// coloris 플러그인의 인풋 선택자
const dotColor = document.getElementById('dotColor');
// coloris 플러그인의 가변 설정 색상값
let dotColorVal = dotColor.value;

// 도트 칸을 지정하는 값
const dotCellX = document.querySelector('#dotCellX');
const dotCellY = document.querySelector('#dotCellY');
dotCellX.addEventListener('change', function(e) {
  setValue.dotCellX = e.target.value;
});
dotCellY.addEventListener('change', function(e) {
  setValue.dotCellY = e.target.value;
});


// 도트 생성 함수
function insertDot(x, y, color) {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dot.style.left = x+'px';
  dot.style.top = y+'px';
  dot.style.backgroundColor = color;
  container.append(dot);
}
// 도트 입력 함수
function createDot(e) {
  // 도트가 찍힐 위치값 지정
  const posX = e.offsetX;
  const posY = e.offsetY;
  const dotX = Math.floor(posX / setValue.dotWidth) * setValue.dotWidth;
  const dotY = Math.floor(posY / setValue.dotHeight) * setValue.dotHeight;
  dotColorVal = dotColor.value;

  // 도트 입력 상태일 때
  if (dotStatus === true) {
    // 클릭 위치가 컨테이너일 때 즉 도트를 찍지 않았으면 도트를 생성
    if (e.target === container) {
      // insertDot(dotX, dotY, dotColorVal);

      for (let i = 0; i < setValue.dotCellX; i++) {
        for (let j = 0; j < setValue.dotCellY; j++) {
          insertDot(dotX + (setValue.dotWidth * i), dotY + (setValue.dotHeight * j), dotColorVal);
        }
      }
    // 도트를 찍었다면 해당 도트의 생삭을 변경한다
    } else {
      e.target.style.backgroundColor = dotColorVal;
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
container.addEventListener('click', createDot);

// 도트 지우기 모드로 변경
function deleteMode() {
  containerGuide.style.display = 'none';
  dotStatus = false;
  cellMoveStatus = false;
  document.getElementById('status').innerText = 'Delete Mode';
}
// 도트 마우스 입력 모드로 변경
function createMode(mode) {
  if (mode === 'mouse') {
    containerGuide.style.display = 'none';
    dotStatus = true;
    cellMoveStatus = false;
    document.getElementById('status').innerText = 'Mouse Insert';
  } else if (mode === 'key') {
    containerGuide.style.display = 'block';
    dotStatus = true;
    cellMoveStatus = true;
    document.getElementById('status').innerText = 'Key Insert';
  }
}

// 마지막에 입력된 도트를 취소함
function undo() {
  if (container.lastChild){
    container.removeChild(container.lastChild);
  } else {
    alert('취소 할 대상이 없음');
  }
}

function guideReset() {
  guideDot.style.top = '0px';
  guideDot.style.left = '0px';
}

// 도안(배경이미지) 파일 업로드 선택자
const dotDesign = document.getElementById('dotDesign');
// 도안 이미지는 변수에 담아서 변경할 수 있다
let designBackground = '';

// 도안 파일이 업로드 되면 실행
dotDesign.addEventListener('change', function(e){
  const file = e.target.files[0]
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  // 이미지 파일이 업로드 되면 배경으로 설정하고 설정값을 입력한다
  fileReader.onload = function(){
    designBackground = `url(${fileReader.result})`;
    container.style.backgroundImage = designBackground;
    container.style.backgroundPosition = '0px 0px';
    container.style.backgroundSize = setValue.baseWidth+'px';
    container.style.backgroundRepeat = 'no-repeat';

    // 에디터 오른 쪽에 예시 이미지를 출력한다
    document.getElementById('sampleImg').src = fileReader.result;
  }
});

// 도안(배경 이미지)을 온오프하는 함수들
function designOn() {
  container.style.backgroundImage = designBackground;
}
function designOff() {
  container.style.backgroundImage = '';
}

// 도안 위치값/사이즈 수정
const bgX = document.getElementById('bgX');
const bgY = document.getElementById('bgY');
const bgW = document.getElementById('bgW');
bgX.addEventListener('change', function(e){
  container.style.backgroundPositionX = e.target.value+'px';
});
bgY.addEventListener('change', function(e){
  container.style.backgroundPositionY = e.target.value+'px';
});
bgW.addEventListener('change', function(e){
  container.style.backgroundSize = e.target.value+'px';
});


// 도안의 컬러값을 출력하기 위해 화면 색상값을 입력받는 함수
function openEyeDropper() {
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
function paintFull() {
  const confirmCheck = confirm('Really?');
  if (confirmCheck) {
    deleteAll();
    const dotW = setValue.dotWidth;
    const dotH = setValue.dotHeight;
    const rowMax = setValue.baseWidth / dotW;
    const colMax = setValue.baseHeight / dotH;
    dotColorVal = dotColor.value;
    for (let i = 0; i < colMax; i++) {
      for (let j = 0; j < rowMax; j++) {
        insertDot(dotW*j, dotH*i, dotColorVal);
      }
    }
  }
}
// 모든 도트를 지우는 함수
function deleteAll() {
  const confirmCheck = confirm('Really?');
  if (confirmCheck) {
    container.innerHTML = '';
  }
}

// 도트를 클립보드에 복사하는 함수
function codeCopy() {
  const codeHTML = `<div class="pixelBox" style="overflow:hidden;position:relative;width:${setValue.baseWidth}px;height:${setValue.baseHeight}px;">${container.innerHTML}</div>`;
  navigator.clipboard.writeText(codeHTML)
  .then(() => {
    console.log('Copied to clipboard : ' + codeHTML);
  })
  .catch(err => {
    console.log('Something went wrong', err);
  })
}

const guideDot = document.querySelector('.guide-dot');

// cell move 인서트 모드
window.onkeydown = (e) => {
  const key = e.key || e.keyCode;
  if (key === 'k') {
    createMode('key');
  } else if (key === 'm') {
    createMode('mouse');
  } else if (key === 'd') {
    deleteMode();
  }

  if (cellMoveStatus === true) {
    if (key === 'ArrowUp') {
      guideDot.style.top = guideDot.offsetTop - setValue.dotHeight + 'px'
    } else if (key === 'ArrowRight') {
      guideDot.style.left = guideDot.offsetLeft + setValue.dotWidth + 'px'
    } else if (key === 'ArrowDown') {
      guideDot.style.top = guideDot.offsetTop + setValue.dotHeight + 'px'
    } else if (key === 'ArrowLeft') {
      guideDot.style.left = guideDot.offsetLeft - setValue.dotWidth + 'px'
    } else if (key === ' ') {
      console.log('space');
      insertDot(guideDot.offsetLeft, guideDot.offsetTop, dotColor.value);
    }
  }

  console.log(key);
};
