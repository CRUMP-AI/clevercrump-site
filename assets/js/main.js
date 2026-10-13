/* Clever Crump — progressive navigation and restrained motion. */
(function () {
  "use strict";

  var nav = document.querySelector(".site-nav, .nav");
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-links") || document.getElementById("nav-menu");

  function closeMenu(restoreFocus) {
    if (!toggle || !menu) return;
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
    if (restoreFocus) toggle.focus();
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = !menu.classList.contains("open");
      menu.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });

    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () { closeMenu(false); });
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menu.classList.contains("open")) closeMenu(true);
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 680 && menu.classList.contains("open")) closeMenu(false);
    });
  }

  function onScroll() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  var reduceMotion = window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
    return;
  }

  revealEls.forEach(function (el) {
    var siblings = Array.prototype.filter.call(el.parentElement.children, function (candidate) {
      return candidate.classList && candidate.classList.contains("reveal");
    });
    var index = siblings.indexOf(el);
    if (siblings.length > 1 && index > 0) {
      el.style.setProperty("--reveal-delay", (index * 0.08).toFixed(2) + "s");
    }
  });

  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("in");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.08, rootMargin: "0px 0px -4% 0px" });

  revealEls.forEach(function (el) { observer.observe(el); });
})();
