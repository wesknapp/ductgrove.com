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
