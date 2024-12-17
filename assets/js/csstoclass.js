// JavaScript script to optimize i tags and extract styles into classes

(function optimizeDotBase() {
    const dotBase = document.querySelector('.dot-base');
    const iTags = dotBase.querySelectorAll('i');
  
    const uniqueLeft = new Map();
    const uniqueBackground = new Map();
  
    let leftCounter = 1;
    let bgCounter = 1;
  
    const styleRules = [];
  
    // Helper function to generate a class and its style rule
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
  
    // Process each i tag
    iTags.forEach((tag) => {
      const styles = tag.getAttribute('style');
      const styleObj = Object.fromEntries(
        styles.split(';').filter(Boolean).map((s) => {
          const [key, value] = s.split(':').map((v) => v.trim());
          return [key, value];
        })
      );
  
      // Extract and replace `left`
      const leftClass = addClassRule(uniqueLeft, styleObj.left, 'l', leftCounter, 'left');
      if (!uniqueLeft.has(styleObj.left)) leftCounter++;
  
      // Extract and replace `background`
      const bgClass = addClassRule(uniqueBackground, styleObj.background, 'b', bgCounter, 'background');
      if (!uniqueBackground.has(styleObj.background)) bgCounter++;
  
      // Apply the new classes and remove the inline style
      tag.className = `${leftClass} ${bgClass}`;
      tag.removeAttribute('style');
    });
  
    // Inject the new style rules into a <style> tag
    const styleTag = document.createElement('style');
    styleTag.textContent = styleRules.join('\n');
    document.head.appendChild(styleTag);
  })();
  