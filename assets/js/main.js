(function () {
  'use strict';

  // 1. Light / Dark theme toggle
  var themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem('ekanshs-theme', next);
      } catch (e) {
        // Ignore storage errors in restricted browsing modes
      }
    });
  }

  // 2. Mobile navigation drawer toggle
  var navToggle = document.getElementById('nav-toggle');
  var mobileNav = document.getElementById('mobile-nav');
  if (navToggle && mobileNav) {
    navToggle.addEventListener('click', function () {
      var expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      mobileNav.hidden = expanded;
    });
  }

  // 3. Publication category filter pills
  var filterButtons = document.querySelectorAll('.filter-btn');
  var pubCards = document.querySelectorAll('.pub-card');
  if (filterButtons.length && pubCards.length) {
    filterButtons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var filter = btn.getAttribute('data-filter');
        filterButtons.forEach(function (other) {
          other.classList.remove('is-active');
          other.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');

        pubCards.forEach(function (card) {
          var category = card.getAttribute('data-category');
          var show =
            filter === 'all' ||
            (filter === 'published' && (category === 'conference' || category === 'journal')) ||
            filter === category;
          card.hidden = !show;
        });
      });
    });
  }

  // 4. BibTeX drawer toggles
  document.querySelectorAll('.btn-bibtex-toggle').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('aria-controls');
      var drawer = targetId ? document.getElementById(targetId) : null;
      if (!drawer) return;
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      drawer.hidden = expanded;
    });
  });

  // 5. Protected email decode + clipboard copy helpers
  function decodeEmail() {
    var k = 42;
    var b = [89, 66, 75, 88, 71, 75, 4, 79, 65, 75, 68, 89, 66, 106, 77, 71, 75, 67, 70, 4, 73, 69, 71];
    var out = '';
    for (var i = 0; i < b.length; i++) {
      out += String.fromCharCode(b[i] ^ k);
    }
    return out;
  }

  function copyText(text, button, defaultLabel) {
    if (!navigator.clipboard || !navigator.clipboard.writeText) {
      return;
    }
    navigator.clipboard.writeText(text).then(function () {
      button.textContent = 'Copied!';
      window.setTimeout(function () {
        button.textContent = defaultLabel;
      }, 1500);
    });
  }

  document.querySelectorAll('.btn-copy-bib').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-bib-target');
      var codeEl = targetId ? document.getElementById(targetId) : null;
      if (codeEl) {
        copyText(codeEl.textContent.trim(), btn, 'Copy');
      }
    });
  });

  document.querySelectorAll('[data-email-compose]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      window.location.href = 'mai' + 'lto:' + decodeEmail();
    });
  });

  document.querySelectorAll('[data-email-copy]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      copyText(decodeEmail(), btn, 'Copy');
    });
  });
})();
