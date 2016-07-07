var RevealMonaco = window.RevealMonaco || (function () {
  var options = Reveal.getConfig().monaco || {};
  options.base = options.base || 'node_modules/reveal-monaco/';
  var indices = Reveal.getIndices();
  loadEditors(Reveal.getCurrentSlide(), { indexh: indices.h, indexv: indices.v });

  Reveal.addEventListener('slidechanged', function (event) {
    unloadEditors(event.previousSlide);
    loadEditors(event.currentSlide, event);
  });

  function loadEditors(element, event) {
    var elements = element.querySelectorAll('monaco-editor');
    elements.forEach(function (element, i) {
      element.setAttribute('theme', element.getAttribute('theme') || options.theme);
      element.setAttribute('fontSize', element.getAttribute('fontSize') || options.fontSize);
      element.id = 'monaco-' + event.indexh + '-' + event.indexv + '-' + i;
      element.className = 'stretch';
      var iframe = document.createElement('iframe');
      iframe.className = 'monaco-frame';
      iframe.height = '100%';
      iframe.width = '100%';
      iframe.src = options.base + 'monaco-container.html?id=' + element.id;
      element.appendChild(iframe);
    });
  }

  function unloadEditors(element) {
    var elements = element.querySelectorAll('monaco-editor');
    elements.forEach(function (element) {
      element.querySelectorAll('iframe.monaco-frame').forEach(function (el) {
        el.remove();
      });
    });
  }

})();
