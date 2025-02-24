import { setValue, container, guideContainer } from "./setting.js";

export default function fileLoad() {
  const dotFile = document.getElementById('dotFile');
  const loadedFile = document.getElementById('loadedFile');

  // 도트 파일이 업로드 되면 실행
  dotFile.addEventListener('change', function(e){
    const file = e.target.files[0];
    const fileReader = new FileReader();
    fileReader.readAsText(file);

    fileReader.onload = function(e){
      const fileContent = e.target.result;

      loadedFile.insertAdjacentHTML('beforeend', fileContent);

      const dotBase = document.querySelector('.dot-base');
      const dotInfo = document.querySelector('.dot-info');

      // === 사이즈 정보 반영 ===
      setValue.baseWidth = parseInt(dotInfo.dataset.width);
      document.getElementById('setWidth').value = setValue.baseWidth;
      container.style.width = `${setValue.baseWidth}px`;
      guideContainer.style.width = `${setValue.baseWidth}px`;

      setValue.baseHeight = parseInt(dotInfo.dataset.height);
      document.getElementById('setHeight').value = setValue.baseHeight;
      container.style.height = `${setValue.baseHeight}px`;
      guideContainer.style.height = `${setValue.baseHeight}px`;

      setValue.bgName = dotInfo.dataset.bgname;

      setValue.bgX = parseInt(dotInfo.dataset.bgx);
      document.getElementById('bgX').value = setValue.bgX;
      container.style.backgroundPositionX = setValue.bgX+'px';
      setValue.bgY = parseInt(dotInfo.dataset.bgy);
      document.getElementById('bgY').value = setValue.bgY;
      container.style.backgroundPositionY = setValue.bgY+'px';
      setValue.bgW = parseInt(dotInfo.dataset.bgw);
      document.getElementById('bgW').value = setValue.bgW;
      container.style.backgroundSize = setValue.bgW+'px';

      // 도트 사이즈 반영
      setValue.dotSize = parseInt(dotInfo.dataset.dotsize);
      document.getElementById('dotSize').value = setValue.dotSize;
      dotSizeApply();

      // 기존 도트 삭제 후 새로운 도트 삽입
      container.innerHTML = '';
      container.insertAdjacentHTML('beforeend', dotBase.innerHTML);

      // 메모리 & DOM 초기화
      setValue.memory.clear();
      setValue.DOM.clear();
      setValue.count = 0;

      container.querySelectorAll('i').forEach(dot => {
        const left = parseInt(dot.style.left);
        const top = parseInt(dot.style.top);
        const dotIdText = `L${left}T${top}`;
        setValue.memory.set(dotIdText, setValue.count);
        setValue.DOM.set(dotIdText, dot);
        setValue.count++;
      });
    }
  });

}

console.log('Module loaded - File load');
