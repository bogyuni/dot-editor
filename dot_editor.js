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

const base = document.getElementById('baseContainer');
const container = document.getElementById('container');
const setValue = {
  baseWidth: 500,
  baseHeight: 500,
  dotWidth: 10,
  dotHeight: 10
};
// 찍은 도트를 모아서 리스트화
let dots = [];


function createDot(e){
  const posX = e.offsetX;
  const posY = e.offsetY;
  const dotX = Math.floor(posX / setValue.dotWidth) * setValue.dotWidth;
  const dotY = Math.floor(posY / setValue.dotHeight) * setValue.dotHeight;
  const dotColor = document.getElementById('dotColor').value;

  // 도트 리스트에 담을 도트 정보
  const instVal = dotX+', '+dotY;
  // 도트 리스트 중에서 내가 방금 찍은 도트가 있는지 체크
  const duplicationCheck = dots.indexOf(instVal) > -1 ? true : false;

  function insertDot() {
    dots.push(instVal);
    const dot = document.createElement('div');
    dot.classList.add('dot');
    dot.style.left = dotX+'px';
    dot.style.top = dotY+'px';
    dot.style.backgroundColor = dotColor;
    container.append(dot);
  }

  // 기존에 배열 중복 체크로 하던 방식
  // if (duplicationCheck === false) {
  //   insertDot();
  // } else {
  // 	console.log('중복');
  // }

  // 기존에 도트 리스트로 중복 체크를 할 때 문제점
  // 내가 클릭한 대상이 container가 아니라, 기존에 찍은 dot를 클릭하면 dot 레이어를 기준으로 위치값을 잡기 때문에 도트 크기 이하의 숫자가 찍힘(10이하)
  // 그러면 container 첫번 째 도트인 0, 0 값을 반환함. 이후로는 중복 체크를 잘 하지만, 한번은 반드시 오류가 나게되어있음.
  // 그래서 이번엔 내가 클릭한 대상이 container 일 때만 도트를 찍도록 수정
  if (e.target === container) {
    insertDot();
  } else{
    console.log('중복');
  }

}
container.addEventListener('click', createDot);

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
  
  navigator.clipboard.writeText(base.innerHTML)
  .then(() => {
    console.log('Copied to clipboard : ' + base.innerHTML);
  })
  .catch(err => {
    console.log('Something went wrong', err);
  })
}
