document.addEventListener('DOMContentLoaded', function() {
  
  const box1 = document.getElementById('scroller');
  const box2 = document.getElementById('adPlacement');

  if (!box1 || !box2) return; 

  let isSyncingBox1 = false;
  let isSyncingBox2 = false;

  box1.addEventListener('scroll', function(e) {
    if (!isSyncingBox1) {
      isSyncingBox2 = true;
      
      // 1. Calculate the percentage scrolled (from 0.0 to 1.0)
      const percentage = this.scrollTop / (this.scrollHeight - this.clientHeight);
      
      // 2. Apply that exact percentage to box 2's total scrollable area
      box2.scrollTop = percentage * (box2.scrollHeight - box2.clientHeight);
    }
    isSyncingBox1 = false;
  });

  box2.addEventListener('scroll', function(e) {
    if (!isSyncingBox2) {
      isSyncingBox1 = true;
      
      const percentage = this.scrollTop / (this.scrollHeight - this.clientHeight);
      box1.scrollTop = percentage * (box1.scrollHeight - box1.clientHeight);
    }
    isSyncingBox2 = false;
  });

});