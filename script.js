// Ductgrove Limited — small site behaviours (no dependencies)
(function () {
    document.documentElement.classList.remove('no-js');

    // Mobile navigation toggle
    var header = document.querySelector('.site-header');
    var toggle = document.querySelector('.nav-toggle');
    if (header && toggle) {
        toggle.addEventListener('click', function () {
            var open = header.classList.toggle('nav-open');
            toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
        });
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && header.classList.contains('nav-open')) {
                header.classList.remove('nav-open');
                toggle.setAttribute('aria-expanded', 'false');
                toggle.focus();
            }
        });
    }

    // Homepage header carousel: crossfade background photos
    var carousel = document.querySelector('.hero-carousel');
    if (carousel) {
        var slides = carousel.querySelectorAll('.hero-slide');
        var dots = carousel.querySelectorAll('.hero-dots button');
        var current = 0;
        var timer = null;
        var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        var load = function (slide) {
            var bg = slide.getAttribute('data-bg');
            if (bg) {
                slide.style.backgroundImage = "url('" + bg + "')";
                slide.removeAttribute('data-bg');
            }
        };
        var show = function (i) {
            slides[current].classList.remove('is-active');
            if (dots[current]) dots[current].removeAttribute('aria-current');
            current = (i + slides.length) % slides.length;
            load(slides[current]);
            load(slides[(current + 1) % slides.length]); // preload the next one
            slides[current].classList.add('is-active');
            if (dots[current]) dots[current].setAttribute('aria-current', 'true');
        };
        var start = function () {
            if (reduceMotion || slides.length < 2) return;
            clearInterval(timer);
            timer = setInterval(function () { show(current + 1); }, 6000);
        };

        Array.prototype.forEach.call(dots, function (dot, i) {
            dot.addEventListener('click', function () { show(i); start(); });
        });
        // Load the second photo once the page has finished loading, then start
        window.addEventListener('load', function () { if (slides[1]) load(slides[1]); start(); });
        // Pause while the tab is hidden
        document.addEventListener('visibilitychange', function () {
            if (document.hidden) clearInterval(timer); else start();
        });
    }

    // Current year in footer
    var year = document.getElementById('year');
    if (year) year.textContent = new Date().getFullYear();

    // Enquiry form: open the visitor's email app with a pre-filled message
    var form = document.getElementById('enquiry-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            if (!form.reportValidity()) return;
            var v = function (name) { return (form.elements[name] && form.elements[name].value || '').trim(); };
            var subject = 'Website enquiry: ' + (v('topic') || 'General') + ' — ' + v('name');
            var body = [
                'Name: ' + v('name'),
                'Company: ' + (v('company') || '-'),
                'Email: ' + v('email'),
                'Phone: ' + (v('phone') || '-'),
                'Enquiry type: ' + (v('topic') || '-'),
                '',
                v('message')
            ].join('\n');
            window.location.href = 'mailto:info@ductgrove.co.uk?subject=' +
                encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
            var status = document.getElementById('form-status');
            if (status) {
                status.textContent = 'Your email application should now open with the message ready to send. ' +
                    'If nothing happens, email info@ductgrove.co.uk or call 01925 596116.';
            }
        });
    }
})();
