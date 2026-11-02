// Shows one language at a time: Polish for Polish browsers, English
// otherwise. The choice is remembered on this device only.
(function () {
  var key = 'lang';
  var buttons = document.querySelectorAll('[data-set-lang]');

  function readSaved() {
    try {
      return localStorage.getItem(key);
    } catch (e) {
      return null;
    }
  }

  function save(lang) {
    try {
      localStorage.setItem(key, lang);
    } catch (e) {
      // Private mode or blocked storage: the choice just is not kept.
    }
  }

  function show(lang) {
    document.documentElement.lang = lang;
    document.querySelectorAll('[data-lang]').forEach(function (el) {
      el.hidden = el.getAttribute('data-lang') !== lang;
    });
    buttons.forEach(function (button) {
      button.setAttribute(
        'aria-pressed',
        String(button.getAttribute('data-set-lang') === lang)
      );
    });
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      var lang = button.getAttribute('data-set-lang');
      save(lang);
      show(lang);
    });
  });

  var browser = (navigator.language || 'en').toLowerCase();
  show(readSaved() || (browser.indexOf('pl') === 0 ? 'pl' : 'en'));
})();
