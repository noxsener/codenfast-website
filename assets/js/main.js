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
                // On mobile, toggle on click
                if (window.innerWidth <= 768) {
                    e.preventDefault();
                    li.classList.toggle('open');
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

        // ── Intersection Observer: card animations ─────────
        if ('IntersectionObserver' in window) {
            var cards = document.querySelectorAll('.box.feature');
            var cardObserver = new IntersectionObserver(function(entries) {
                entries.forEach(function(entry) {
                    if (entry.isIntersecting) {
                        entry.target.style.opacity = '1';
                        entry.target.style.transform = 'translateY(0)';
                        cardObserver.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

            cards.forEach(function(card, i) {
                card.style.opacity = '0';
                card.style.transform = 'translateY(28px)';
                card.style.transition = 'opacity 0.5s ease ' + (i % 3 * 0.1) + 's, transform 0.5s ease ' + (i % 3 * 0.1) + 's';
                cardObserver.observe(card);
            });
        }

        // ── Typing cursor on banner label (cosmetic) ──────
        var bannerLabel = document.querySelector('#banner .banner-text .label');
        if (bannerLabel) {
            var text = bannerLabel.textContent;
            bannerLabel.textContent = '';
            var cursor = document.createElement('span');
            cursor.style.cssText = 'border-right: 2px solid #00d4ff; display:inline-block; margin-left:2px; animation: blink 0.8s step-end infinite;';
            var style = document.createElement('style');
            style.textContent = '@keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }';
            document.head.appendChild(style);
            bannerLabel.appendChild(cursor);
            var i = 0;
            var typeInterval = setInterval(function() {
                if (i < text.length) {
                    bannerLabel.insertBefore(document.createTextNode(text[i]), cursor);
                    i++;
                } else {
                    clearInterval(typeInterval);
                }
            }, 40);
        }

        // ── Smooth scroll for anchor links ────────────────
        document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
            anchor.addEventListener('click', function(e) {
                var target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });
    });

})();