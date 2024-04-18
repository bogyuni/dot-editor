export {colorisPliugin, setValue, container, baseContainer, guideContainer};

const colorisPliugin = () => {
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
}

// 초기 설정 값
const setValue = {
  baseWidth: 300,
  baseHeight: 300,
  dotSize: 5,
  dotCellX: 1,
  dotCellY: 1,
};

const container = document.getElementById('container');
const guideContainer = document.getElementById('guideContainer');
const baseContainer = document.getElementById('baseContainer');

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
  container.style.backgroundPositionX = e.target.value+'px';
});
bgY.addEventListener('change', function(e){
  container.style.backgroundPositionY = e.target.value+'px';
});
bgW.addEventListener('change', function(e){
  container.style.backgroundSize = e.target.value+'px';
});

// 도트의 사이즈 지정, 기본 값은 5
const dotSize = document.getElementById('dotSize');
// 도트 사이즈 적용 함수
window.dotSizeApply = () => {
  setValue.dotSize = parseInt(dotSize.value);
  document.body.insertAdjacentHTML('beforeend',
    `<style>
      .guide-container{background-size: ${setValue.dotSize}px ${setValue.dotSize}px, ${setValue.dotSize}px ${setValue.dotSize}px;}
      .guide-container .guide-dot{width:${setValue.dotSize}px;height:${setValue.dotSize}px;}
      .dot{width:${setValue.dotSize}px;height:${setValue.dotSize}px;}
    </style>`
  );
}

console.log('Module - setting loaded');