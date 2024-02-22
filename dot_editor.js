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

const container = document.getElementById('container');
const setValue = {
  baseWidth: 300,
  baseHeight: 300,
  dotWidth: 10,
  dotHeight: 10
};
let dotStatus = true;

const setWidth = document.getElementById('setWidth');
const setHeight = document.getElementById('setHeight');

function setSize() {
  setValue.baseWidth = setWidth.value;
  setValue.baseHeight = setHeight.value;
  container.style = `width:${setValue.baseWidth}px;height:${setValue.baseHeight}px;`;
}

// const dotColor = document.getElementById('dotColor').value;

function insertDot(x, y, color) {
  const dot = document.createElement('div');
  dot.classList.add('dot');
  dot.style.left = x+'px';
  dot.style.top = y+'px';
  dot.style.backgroundColor = color;
  container.append(dot);
}

function createDot(e) {
  const posX = e.offsetX;
  const posY = e.offsetY;
  const dotX = Math.floor(posX / setValue.dotWidth) * setValue.dotWidth;
  const dotY = Math.floor(posY / setValue.dotHeight) * setValue.dotHeight;
  const dotColor = document.getElementById('dotColor').value;

  if (dotStatus === true) {
    if (e.target === container) {
      insertDot(dotX, dotY, dotColor);
    } else {
      e.target.style.backgroundColor = dotColor;
    }
  } else {
    if (e.target !== container) {
      container.removeChild(e.target);
    } else {
      console.log('삭제 대상이 없습니다');
    }
  }
}
container.addEventListener('click', createDot);

function deleteMode() {
  dotStatus = false;
  document.getElementById('status').innerText = 'Delete Mode';
}
function createMode() {
  dotStatus = true;
  document.getElementById('status').innerText = '';
}

function undo() {
  if (container.lastChild){
    container.removeChild(container.lastChild);
  } else {
    alert('취소 할 대상이 없음');
  }
}

const dotDesign = document.getElementById('dotDesign');
let designBackground = '';

dotDesign.addEventListener('change', function(e){
  const file = e.target.files[0]
  const fileReader = new FileReader();
  fileReader.readAsDataURL(file);
  fileReader.onload = function(){
    designBackground = `background : url(${fileReader.result}); background-size : cover`;
    container.style = designBackground;
  }
});

function designOn() {
  container.style = designBackground;
}
function designOff() {
  container.style = '';
}

function paintFull() {
  const dotW = setValue.dotWidth;
  const dotH = setValue.dotHeight;
  const rowMax = setValue.baseWidth / dotW;
  const colMax = setValue.baseHeight / dotH;
  const dotColor = document.getElementById('dotColor').value;
  for (let i = 0; i < colMax; i++) {
    for (let j = 0; j < rowMax; j++) {
      insertDot(dotW*j, dotH*i, dotColor);
    }
  }
}

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
