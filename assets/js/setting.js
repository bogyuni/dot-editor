export function setting() {
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



function openEyeDropper() {
  const resultElement = document.getElementById("result");

  if (!window.EyeDropper) {
    resultElement.textContent = "Your browser does not support the EyeDropper API";
    return;
  }

  const eyeDropper = new EyeDropper();

  eyeDropper
    .open()
    .then((result) => {
      resultElement.textContent = result.sRGBHex;
      resultElement.style.backgroundColor = result.sRGBHex;
      dotColor.value = result.sRGBHex;
    })
    .catch((e) => {
      resultElement.textContent = e;
    });
}


}
