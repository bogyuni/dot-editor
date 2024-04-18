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

    const cssAdd = `<style>.${pixelName} > .dot{position:absolute;width:${setValue.dotSize}px !important;height:${setValue.dotSize}px !important;}</style>`;
    const codeHTML = `${cssAdd}\n<div class="${pixelName}" style="overflow:hidden;position:relative;width:${setValue.baseWidth}px;height:${setValue.baseHeight}px;">${container.innerHTML}</div>`;
    navigator.clipboard.writeText(codeHTML)
    .then(() => {
      console.log('Copied to clipboard : ' + codeHTML);
    })
    .catch(err => {
      console.log('Something went wrong', err);
    })
  }

  console.log('Module - print loaded');
}