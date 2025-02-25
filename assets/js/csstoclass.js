/* 
  i 태그를 최적화하고 style을 class로 추출하는 JavaScript 스크립트

  해당 스크립트는 프롬프트만 사용하여, chatGPT에게 요구한 스크립트임
  주문 내용은 아마, dot-base class 안의 i 태그들의 inline style을 추출하여,
  left와 background를 css class로 추출하여 용량을 줄이는 것을 목표로 제작한 것 같다.
  다만 현재 코드로는 left만 추출하고 내용도 문제가 있음.
  나중에 기회가 된다면 리팩토링 할 가치는 있다고 생각함.
  - 전체 dot의 크기가 동일하게 된 상태
  - inline 코드의 용량이 너무 비대해졌을 때
  - 서보균 : 2025-02-25
*/

(function optimizeDotBase() {
    const dotBase = document.querySelector('.dot-base');
    const iTags = dotBase.querySelectorAll('i');
  
    const uniqueLeft = new Map();
    const uniqueBackground = new Map();
  
    let leftCounter = 1;
    let bgCounter = 1;
  
    const styleRules = [];
  
    // class와 해당 style 규칙을 생성하는 도우미 함수
    const addClassRule = (map, value, prefix, counter, property) => {
      if (!map.has(value)) {
        const className = `${prefix}${counter}`;
        map.set(value, className);
        const rule = `.${className} { ${property}: ${value}; }`;
        styleRules.push(rule);
        return className;
      }
      return map.get(value);
    };
  
    // 각각의 i 태그를 처리
    iTags.forEach((tag) => {
      const styles = tag.getAttribute('style');
      const styleObj = Object.fromEntries(
        styles.split(';').filter(Boolean).map((s) => {
          const [key, value] = s.split(':').map((v) => v.trim());
          return [key, value];
        })
      );
  
      // left 추출하여 교체
      const leftClass = addClassRule(uniqueLeft, styleObj.left, 'l', leftCounter, 'left');
      if (!uniqueLeft.has(styleObj.left)) leftCounter++;
  
      // background 추출하여 교체
      const bgClass = addClassRule(uniqueBackground, styleObj.background, 'b', bgCounter, 'background');
      if (!uniqueBackground.has(styleObj.background)) bgCounter++;
  
      // 새로운 class를 적용하고 인라인 style을 제거
      tag.className = `${leftClass} ${bgClass}`;
      tag.removeAttribute('style');
    });
  
    // <style> 태그에 css style 삽입하여 head에 추가가
    const styleTag = document.createElement('style');
    styleTag.textContent = styleRules.join('\n');
    document.head.appendChild(styleTag);
  })();
  