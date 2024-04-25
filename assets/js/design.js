import { container } from "./setting.js";


export default function design(size) {
  // 도안(배경이미지) 파일 업로드 선택자
  const dotDesign = document.getElementById('dotDesign');
  // 도안 이미지는 변수에 담아서 변경할 수 있다
  let designBackground = '';
  // 도안 이미지 온오프 값
  let designStatus = true;

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
      container.style.backgroundSize = size+'px';
      container.style.backgroundRepeat = 'no-repeat';
    }
  });

  // 도안(배경 이미지)을 온오프하는 함수들
  window.designOnOff = () => {
    if (designStatus === false) {
      container.style.backgroundImage = designBackground;
      document.getElementById('designOnOff').innerText = 'Design Off';
    } else {
      container.style.backgroundImage = '';
      document.getElementById('designOnOff').innerText = 'Design On';
    }
    designStatus = !designStatus;
  }

  console.log('Module loaded - Design');
}