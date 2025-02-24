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

    console.log(setValue.memory);

    const dotInfo = `<input type="hidden" class="dot-info" data-width="${setValue.baseWidth}" data-height="${setValue.baseHeight}" data-bgname="${setValue.bgName}" data-bgx="${setValue.bgX}" data-bgy="${setValue.bgY}" data-bgw="${setValue.bgW}" data-dotsize="${setValue.dotSize}" value="${setValue.memory}" />`;
    const cssAdd = `<style>.${pixelName} i{position:absolute !important;width:${setValue.dotSize}px !important;height:${setValue.dotSize}px !important;}</style>`;
    const codeHTML = `<div class="${pixelName}">${dotInfo}${cssAdd}<div class="dot-base" style="overflow:hidden;position:relative;width:${setValue.baseWidth}px;height:${setValue.baseHeight}px;">${container.innerHTML}</div></div>`;
    const printCode = codeHTML.replace(/: |; |, |;"/g, (matched) => {
      const replacements = {
        ': ': ':',
        '; ': ';',
        ', ': ',',
        ';"': '"',
      };
      return replacements[matched];
    });
    navigator.clipboard.writeText(printCode)
    .then(() => {
      console.log('Copied to clipboard : ' + printCode);
    })
    .catch(err => {
      console.log('Something went wrong', err);
    })
  }

}

console.log('Module loaded - Print');
