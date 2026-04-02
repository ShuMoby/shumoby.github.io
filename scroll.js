document.addEventListener('DOMContentLoaded', function() {
  const box1 = document.getElementById('scroller');
  const box2 = document.getElementById('adPlacement');

  if (!box1 || !box2) return;

  // Filter the direct children to only include <section> elements
  // Note: JavaScript returns tag names in all uppercase
  const items1 = Array.from(box1.children).filter(child => child.tagName === 'SECTION');
  const items2 = Array.from(box2.children).filter(child => child.tagName === 'SECTION');

  if (items1.length === 0 || items2.length === 0) {
    console.error("Containers must have <section> elements for this to work.");
    return;
  }

  const observerOptions = {
    root: box1,
    rootMargin: '0px',
    threshold: 0    
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        
        const activeIndex = items1.indexOf(entry.target);
        
        // Loop the sections in container 2 using Modulo
        const targetIndex2 = activeIndex % items2.length;
        const targetItem = items2[targetIndex2];

        box2.scrollTo({
          top: targetItem.offsetTop,
          behavior: 'smooth' 
        });
      }
    });
  }, observerOptions);

  items1.forEach(item => observer.observe(item));
});