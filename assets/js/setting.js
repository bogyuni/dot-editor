const colorisPliugin = () => {
  // 컬러픽커 플러그인 설정
  Coloris({
    el: '.coloris',
  });
  Coloris.setInstance('.coloris', {
    theme: 'pill',
    themeMode: 'dark',
    format: 'hex',
    formatToggle: true,
    closeButton: true,
    clearButton: true,
    swatches: [ '#067bc2', '#84bcda', '#80e377', '#ecc30b', '#f37748', '#d56062' ],
    defaultColor: '#000000',
  });
}

// coloris 플러그인의 인풋 선택자
const dotColor = document.getElementById('dotColor');

// 초기 설정 값
const setValue = {
  baseWidth: 300,
  baseHeight: 300,
  dotSize: 4,
  dotCellX: 1,
  dotCellY: 1,
  bgX: 0,
  bgY: 0,
  bgW: 300,
  bgName: '',
  memory: ''
};

const baseContainer = document.getElementById('baseContainer');
const container = document.getElementById('container');
const guideContainer = document.getElementById('guideContainer');
// 가이드 커서 선택자
const guideDot = document.getElementById('guideDot');

// 컨테이너 사이즈 조정을 위한 인풋 선택자
const setWidth = document.getElementById('setWidth');
const setHeight = document.getElementById('setHeight');
setWidth.addEventListener('change', function(e) {
  setValue.baseWidth = e.target.value;
  container.style.width = `${setValue.baseWidth}px`;
  guideContainer.style.width = `${setValue.baseWidth}px`;
});
setHeight.addEventListener('change', function(e) {
  setValue.baseHeight = e.target.value;
  container.style.height = `${setValue.baseHeight}px`;
  guideContainer.style.height = `${setValue.baseHeight}px`;
});

// 도안 위치값/사이즈 수정
const bgX = document.getElementById('bgX');
const bgY = document.getElementById('bgY');
const bgW = document.getElementById('bgW');
bgX.addEventListener('change', function(e){
  setValue.bgX = e.target.value;
  container.style.backgroundPositionX = e.target.value+'px';
});
bgY.addEventListener('change', function(e){
  setValue.bgY = e.target.value;
  container.style.backgroundPositionY = e.target.value+'px';
});
bgW.addEventListener('change', function(e){
  setValue.bgW = e.target.value;
  container.style.backgroundSize = e.target.value+'px';
});

// 도트의 사이즈 지정, 기본 값은 4
const dotSize = document.getElementById('dotSize');
// 도트 사이즈 적용 함수
window.dotSizeApply = () => {
  guideDot.style.top = '0px';
  guideDot.style.left = '0px';

  setValue.dotSize = parseInt(dotSize.value);
  document.body.insertAdjacentHTML('beforeend',
    `<style>
      .guide-container{background-size: ${setValue.dotSize}px ${setValue.dotSize}px, ${setValue.dotSize}px ${setValue.dotSize}px;}
      .guide-container .guide-dot{width:${setValue.dotSize}px;height:${setValue.dotSize}px;}
      .container > i{width:${setValue.dotSize}px;height:${setValue.dotSize}px;}
    </style>`
  );
}

// 도트 칸을 지정하는 값
/* 도트 칸 확장하는 기능 중지, 마우스 모드에서 기능 구현됨.
  마우스 입력 기능 중지 함에 따라 잠정 보류
const dotCellX = document.getElementById('dotCellX');
const dotCellY = document.getElementById('dotCellY');
dotCellX.addEventListener('change', function(e) {
  setValue.dotCellX = e.target.value;
});
dotCellY.addEventListener('change', function(e) {
  setValue.dotCellY = e.target.value;
});*/


// 도트 생성 함수
function createDot(x, y, color) {
  const dot = document.createElement('i');
  dot.style.left = x+'px';
  dot.style.top = y+'px';
  dot.style.background = color;
  container.append(dot);
}


export {colorisPliugin, dotColor, setValue, container, baseContainer, guideContainer, guideDot, createDot};

console.log('Module loaded - Setting');
