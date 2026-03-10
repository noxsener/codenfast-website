/**
 * Digital Dark Industries — main.js
 * Codenfast CMS — darkdevelopers template
 */

(function() {
    'use strict';

    // ── Preload class removal ─────────────────────────────
    window.addEventListener('load', function() {
        document.body.classList.remove('is-preload');
    });

    // ── Scroll state ──────────────────────────────────────
    window.addEventListener('scroll', function() {
        if (window.scrollY > 10) {
            document.body.classList.add('scrolled');
        } else {
            document.body.classList.remove('scrolled');
        }
    }, { passive: true });

    // ── Mobile nav toggle ─────────────────────────────────
    document.addEventListener('DOMContentLoaded', function() {
        var toggleBtn = document.getElementById('nav-toggle');
        var nav       = document.getElementById('nav');

        if (toggleBtn && nav) {
            toggleBtn.addEventListener('click', function(e) {
                e.stopPropagation();
                nav.classList.toggle('open');
                toggleBtn.setAttribute('aria-expanded', nav.classList.contains('open'));
            });

            // Close on outside click
            document.addEventListener('click', function(e) {
                if (!nav.contains(e.target) && e.target !== toggleBtn) {
                    nav.classList.remove('open');
                    toggleBtn.setAttribute('aria-expanded', 'false');
                }
            });
        }

        // ── Dropdown "opener" links (touch/click) ─────────
        var openers = document.querySelectorAll('#nav li.opener > a');
        openers.forEach(function(opener) {
            opener.addEventListener('click', function(e) {
                var li = this.parentElement;
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    e.stopPropagation(); // prevent outside-click handler from firing
                    var isOpen = li.classList.contains('open');
                    // Close all other open dropdowns first
                    document.querySelectorAll('#nav li.opener.open').forEach(function(other) {
                        if (other !== li) other.classList.remove('open');
                    });
                    li.classList.toggle('open', !isOpen);
                }
            });
        });

        // ── Desktop hover dropdowns ───────────────────────
        var dropdownItems = document.querySelectorAll('#nav li');
        dropdownItems.forEach(function(li) {
            li.addEventListener('mouseenter', function() {
                if (window.innerWidth > 768) this.classList.add('open');
            });
            li.addEventListener('mouseleave', function() {
                if (window.innerWidth > 768) this.classList.remove('open');
            });
        });

        // ── Intersection Observer: removed — CSS handles card animations ──

        // ── Typing effect: removed — use CSS animation instead ────────

        // ── Smooth scroll for anchor links ────────────────
        // Exclude nav links to avoid conflicting with dropdown toggle
        document.querySelectorAll('a[href^="#"]:not(#nav a)').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                var href = this.getAttribute('href');
                if (href === '#') return;
                var target = document.querySelector(href);
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    });

})();