/* Clever Crump — clevercrump.com
   Mobile nav, scrolled nav state, footer year, staggered scroll reveals.
   Vanilla JS. No dependencies. */

(function () {
  "use strict";

  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");

  /* Mobile nav */
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
      document.body.style.overflow = open ? "hidden" : "";
    });
    menu.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menu.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
        document.body.style.overflow = "";
      });
    });
  }

  /* Nav background deepens after scrolling */
  function onScroll() {
    if (nav) nav.classList.toggle("scrolled", window.scrollY > 24);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* Footer year */
  document.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Staggered reveals */
  var reduceMotion =
    window.matchMedia &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  var revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;

  if (reduceMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("in"); });
    return;
  }

  /* Stagger siblings that share a parent (e.g. product cards) */
  revealEls.forEach(function (el) {
    var sibs = Array.prototype.filter.call(el.parentElement.children, function (c) {
      return c.classList && c.classList.contains("reveal");
    });
    var idx = sibs.indexOf(el);
    if (sibs.length > 1 && idx > 0) {
      el.style.setProperty("--reveal-delay", (idx * 0.12).toFixed(2) + "s");
    }
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("in");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -6% 0px" }
  );

  revealEls.forEach(function (el) { observer.observe(el); });
})();
