// A ripple spreading from the press point on buttons and app cards.
(function () {
  var reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;
  if (reduceMotion) {
    return;
  }

  function addRipple(event) {
    var target = event.currentTarget;
    var rect = target.getBoundingClientRect();
    // Big enough to cover the element from any corner.
    var size = Math.hypot(rect.width, rect.height) * 2;
    var ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.width = size + 'px';
    ripple.style.height = size + 'px';
    ripple.style.left = event.clientX - rect.left - size / 2 + 'px';
    ripple.style.top = event.clientY - rect.top - size / 2 + 'px';
    ripple.addEventListener('animationend', function () {
      ripple.remove();
    });
    target.appendChild(ripple);
  }

  document
    .querySelectorAll('.pill, .lang-switch button, a.app')
    .forEach(function (el) {
      el.addEventListener('pointerdown', addRipple);
    });
})();
