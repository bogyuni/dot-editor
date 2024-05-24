import { setValue, container } from './setting.js';

export default function print() {
  // 도트를 클립보드에 복사하는 함수
  window.codeCopy = () => {
    const pixelNameVal = document.querySelector('#pixelName').value;
    let pixelName = '';

    if (pixelNameVal === '' || pixelNameVal === ' ' || pixelNameVal === null) {
      pixelName = 'pixelBox';
    } else {
      pixelName = pixelNameVal;
    }

    const dotInfo = `<input type="hidden" class="dot-info" data-width="${setValue.baseWidth}" data-height="${setValue.baseHeight}" data-bgname="${setValue.bgName}" data-bgx="${setValue.bgX}" data-bgy="${setValue.bgY}" data-bgw="${setValue.bgW}" data-dotsize="${setValue.dotSize}" />`;
    const cssAdd = `<style>.${pixelName} > .dot{position:absolute;width:${setValue.dotSize}px !important;height:${setValue.dotSize}px !important;}</style>`;
    const codeHTML = `${dotInfo}\n${cssAdd}\n<div class="${pixelName} dot-base" style="overflow:hidden;position:relative;width:${setValue.baseWidth}px;height:${setValue.baseHeight}px;">${container.innerHTML}</div>`;
    navigator.clipboard.writeText(codeHTML)
    .then(() => {
      console.log('Copied to clipboard : ' + codeHTML);
    })
    .catch(err => {
      console.log('Something went wrong', err);
    })
  }

}

console.log('Module loaded - Print');
