/**
 * Digital Dark Industries — util.js
 * Codenfast CMS — darkdevelopers template
 */

(function() {
    'use strict';

    // ── Polyfill: Element.closest ─────────────────────────
    if (!Element.prototype.closest) {
        Element.prototype.closest = function(selector) {
            var el = this;
            while (el && el.nodeType === 1) {
                if (el.matches(selector)) return el;
                el = el.parentElement || el.parentNode;
            }
            return null;
        };
    }

    // ── Utility: debounce ─────────────────────────────────
    window.DDI = window.DDI || {};

    window.DDI.debounce = function(fn, delay) {
        var timer;
        return function() {
            clearTimeout(timer);
            timer = setTimeout(fn.apply.bind(fn, this, arguments), delay);
        };
    };

    // ── Utility: throttle ─────────────────────────────────
    window.DDI.throttle = function(fn, limit) {
        var inThrottle;
        return function() {
            if (!inThrottle) {
                fn.apply(this, arguments);
                inThrottle = true;
                setTimeout(function() { inThrottle = false; }, limit);
            }
        };
    };

    // ── Resize handler ────────────────────────────────────
    var resizeHandler = window.DDI.debounce(function() {
        // Close mobile nav on resize to desktop
        if (window.innerWidth > 768) {
            var nav = document.getElementById('nav');
            if (nav) nav.classList.remove('open');
        }
    }, 150);

    window.addEventListener('resize', resizeHandler, { passive: true });

})();