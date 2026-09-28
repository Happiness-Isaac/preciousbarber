// Shared across every page: theme toggle, nav drawer, back-to-top, scroll reveal
(function () {
    var html = document.documentElement, theme = 'dark';
    try { theme = localStorage.getItem('pb-theme') || 'dark'; } catch (e) { }
    var SUN = '<circle cx="12" cy="12" r="4.5" fill="currentColor"/><g stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><path d="M12 2.5v2.5M12 19v2.5M21.5 12H19M5 12H2.5M18.4 5.6l-1.8 1.8M7.4 16.6l-1.8 1.8M18.4 18.4l-1.8-1.8M7.4 7.4L5.6 5.6"/></g>';
    var MOON = '<path fill="currentColor" d="M20 14.5A8.5 8.5 0 019.5 4 8.5 8.5 0 1020 14.5z"/>';
    function paintIcon() {
        var el = document.getElementById('themeIcon');
        if (el) el.innerHTML = theme === 'dark' ? MOON : SUN;
    }
    html.setAttribute('data-theme', theme);
    paintIcon();
    var themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.onclick = function () {
            theme = theme === 'dark' ? 'light' : 'dark';
            html.setAttribute('data-theme', theme);
            try { localStorage.setItem('pb-theme', theme); } catch (e) { }
            paintIcon();
        };
    }

    // nav drawer (used on desktop + mobile alike)
    var menuBtn = document.getElementById('menuBtn'), drawer = document.getElementById('navDrawer'),
        overlay = document.getElementById('drawerOverlay'), closeBtn = document.getElementById('closeDrawer');
    function openDrawer() { drawer.classList.add('open'); overlay.classList.add('open'); }
    function closeDrawer() { drawer.classList.remove('open'); overlay.classList.remove('open'); }
    if (menuBtn) {
        menuBtn.onclick = openDrawer;
        closeBtn.onclick = closeDrawer;
        overlay.onclick = closeDrawer;
        document.querySelectorAll('.drawer-links a').forEach(function (a) { a.addEventListener('click', closeDrawer); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeDrawer(); });
    }

    // back to top
    var backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', function () {
            backToTop.classList.toggle('show', window.scrollY > 500);
        });
        backToTop.onclick = function () { window.scrollTo({ top: 0, behavior: 'smooth' }); };
    }

    // scroll reveal
    var revealObserver = ('IntersectionObserver' in window) ? new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                entry.target.classList.add('in-view');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15 }) : null;
    function initReveal() {
        document.querySelectorAll('.reveal').forEach(function (el) {
            if (revealObserver) revealObserver.observe(el);
            else el.classList.add('in-view');
        });
    }
    window.pbObserveReveal = function (items) {
        items.forEach(function (el) {
            el.classList.add('reveal');
            if (revealObserver) revealObserver.observe(el);
            else el.classList.add('in-view');
        });
    };
    document.addEventListener('DOMContentLoaded', initReveal);
})();