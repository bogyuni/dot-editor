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
  baseWidth: 500,
  baseHeight: 500,
  dotWidth: 10,
  dotHeight: 10
};
let dotStatus = true;


function createDot(e){
  const posX = e.offsetX;
  const posY = e.offsetY;
  const dotX = Math.floor(posX / setValue.dotWidth) * setValue.dotWidth;
  const dotY = Math.floor(posY / setValue.dotHeight) * setValue.dotHeight;
  const dotColor = document.getElementById('dotColor').value;

  function insertDot() {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.style.left = dotX+'px';
    dot.style.top = dotY+'px';
    dot.style.backgroundColor = dotColor;
    container.append(dot);
  }

  if (dotStatus === true) {
    if (e.target === container) {
      insertDot();
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

function codeCopy() {
  const codeHTML = '<div class="pixelBox">'+container.innerHTML+"</div>";
  navigator.clipboard.writeText(codeHTML)
  .then(() => {
    console.log('Copied to clipboard : ' + codeHTML);
  })
  .catch(err => {
    console.log('Something went wrong', err);
  })
}
