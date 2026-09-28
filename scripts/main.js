(function () {
    var WHATSAPP_NUMBER = '2348136750711';
    var EMAIL_ADDRESS = 'mmabahappiness@gmail.com';
    var THANK_YOU_URL = new URL('thank-you.html', window.location.href).href;

    /* ---------- hero slider ---------- */
    var palettes = [['#241d08', '#0d0d0e'], ['#1c1c1e', '#0d0d0e'], ['#221a06', '#151517'], ['#0d0d0e', '#241d08']];
    var icons = [
        '<path d="M6 8c8 8 8 16 0 24M34 8c-8 8-8 16 0 24" stroke="currentColor" stroke-width="2" fill="none"/>',
        '<circle cx="10" cy="30" r="5" stroke="currentColor" stroke-width="2" fill="none"/><circle cx="10" cy="10" r="5" stroke="currentColor" stroke-width="2" fill="none"/><path d="M14 13l22 22M14 27l22-22" stroke="currentColor" stroke-width="2"/>',
        '<rect x="4" y="16" width="32" height="4" fill="currentColor"/><rect x="4" y="24" width="32" height="4" fill="currentColor"/>',
        '<path d="M8 4v32M16 4v32M24 4v32M32 4v32" stroke="currentColor" stroke-width="2"/>'
    ];
    var slidesEl = document.getElementById('slides'), dotsEl = document.getElementById('dots');
    if (slidesEl) {
        palettes.forEach(function (p, i) {
            var d = document.createElement('div'); d.className = 'slide' + (i === 0 ? ' active' : '');
            d.innerHTML = '<div class="field" style="--s1:' + p[0] + ';--s2:' + p[1] + '"></div><svg class="icon" viewBox="0 0 40 40">' + icons[i] + '</svg>';
            slidesEl.appendChild(d);
            var dot = document.createElement('button'); if (i === 0) dot.className = 'active';
            dot.onclick = function () { showHero(i); };
            dotsEl.appendChild(dot);
        });
        var hSlides = slidesEl.children, hDots = dotsEl.children, hCur = 0;
        function showHero(i) {
            hSlides[hCur].classList.remove('active'); hDots[hCur].classList.remove('active');
            hCur = i; hSlides[hCur].classList.add('active'); hDots[hCur].classList.add('active');
        }
        setInterval(function () { showHero((hCur + 1) % hSlides.length); }, 5000);
    }

    /* ---------- services ---------- */
    var services = {
        "Barbing": [["Adult Haircut (Men/Women)", "Classic clipper cut, finished with a hot towel.", "₦8,000"], ["Skin Fade", "Precision fade, blended to skin.", "₦10,000"], ["Beard Trim & Shape", "Line-up, shape and conditioning oil.", "₦5,000"], ["Haircut + Beard Combo", "Full service, top to chin.", "₦12,000"], ["Kids Cut (under 12)", "Patient, quick, tidy.", "₦6,000"], ["Line-Up / Edge-Up", "Sharp outline touch-up.", "₦3,500"], ["Wash & Blow Dry", "Deep cleanse and style finish.", "₦4,000"]],
        "Grooming & Spa": [["Hot Towel Shave", "Straight-razor shave with pre-shave oil.", "₦9,000"], ["Facial Cleanse", "Deep clean, steam and moisturise.", "₦12,000"], ["Head Massage", "10-minute tension release.", "₦4,000"], ["Eyebrow Trim", "Clean, natural shaping.", "₦2,500"], ["Ear & Nose Waxing", "Quick and painless.", "₦3,000"]],
        "Colour": [["Grey Blending", "Natural-looking grey coverage.", "₦15,000"], ["Full Colour", "Bold colour, consultation included.", "₦25,000"], ["Highlights", "Subtle or statement highlights.", "₦20,000"]],
        "Dreadlocks": [["Locking with natural hair", "", "₦10,000"], ["Locking with extension", "", "₦15,000"], ["Relocking", "", "₦5,000"]],
        "Home Service": [["House Call Haircut", "Service at your convenince.", "₦15,000"], ["House Call Full Grooming", "Cut, beard and shave at home.", "₦25,000"], ["Event / Group Booking", "Weddings, shoots, group prep.", "From ₦60,000"], ["Corporate On-Site Grooming", "Grooming days for your office.", "Custom quote"]]
    };
    var tabsEl = document.getElementById('tabs'), gridEl = document.getElementById('svcGrid');
    if (tabsEl) {
        Object.keys(services).forEach(function (cat, i) {
            var t = document.createElement('button'); t.className = 'tab' + (i === 0 ? ' active' : ''); t.textContent = cat;
            t.onclick = function () {
                Array.from(tabsEl.children).forEach(function (x) { x.classList.remove('active'); });
                t.classList.add('active'); renderSvc(cat);
            };
            tabsEl.appendChild(t);
        });
        function renderSvc(cat) {
            gridEl.innerHTML = '';
            var items = [];
            services[cat].forEach(function (s) {
                var el = document.createElement('div'); el.className = 'svc';
                el.innerHTML = '<div><h4>' + s[0] + '</h4><p>' + s[1] + '</p></div><div class="price">' + s[2] + '</div>';
                gridEl.appendChild(el); items.push(el);
            });
            window.pbObserveReveal(items);
        }
        renderSvc(Object.keys(services)[0]);
    }

    /* ---------- gallery carousel + lightbox ---------- */
    var galItems = [
        { type: 'image', caption: 'Skin fade — add photo' },
        { type: 'video', caption: 'Beard sculpt — add video' },
        { type: 'image', caption: 'Classic taper — add photo' },
        { type: 'image', caption: 'Hot towel shave — add photo' },
        { type: 'video', caption: 'Line-up in motion — add video' },
        { type: 'image', caption: 'Studio moment — add photo' }
    ];
    var track = document.getElementById('galTrack'), galDots = document.getElementById('galDots');
    if (track) {
        var camIcon = '<svg class="media-icon" viewBox="0 0 24 24" fill="none"><path d="M4 8h3l1.5-2h7L17 8h3v11H4z" stroke="currentColor" stroke-width="1.6"/><circle cx="12" cy="13.5" r="3.2" stroke="currentColor" stroke-width="1.6"/></svg>';
        var playIcon = '<svg class="media-icon" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.6"/><path d="M10 8.5l6 3.5-6 3.5z" fill="currentColor"/></svg>';
        galItems.forEach(function (item, i) {
            var s = document.createElement('div'); s.className = 'gal-slide' + (i === 0 ? ' is-active' : '');
            s.innerHTML = '<div class="field"></div>' + (item.type === 'video' ? playIcon : camIcon) + '<span class="gal-caption">' + item.caption + '</span>';
            track.appendChild(s);
            var d = document.createElement('button'); if (i === 0) d.className = 'active';
            d.onclick = function () { showGal(i); };
            galDots.appendChild(d);
        });
        var gSlides = track.children, gDots = galDots.children, gCur = 0;
        function showGal(i) {
            gSlides[gCur].classList.remove('is-active'); gDots[gCur].classList.remove('active');
            gCur = (i + gSlides.length) % gSlides.length;
            track.style.transform = 'translateX(-' + (gCur * 100) + '%)';
            gSlides[gCur].classList.add('is-active'); gDots[gCur].classList.add('active');
        }
        document.getElementById('galPrev').onclick = function () { showGal(gCur - 1); };
        document.getElementById('galNext').onclick = function () { showGal(gCur + 1); };
        var galAuto = setInterval(function () { showGal(gCur + 1); }, 5500);
        var galViewport = document.querySelector('.gal-viewport');
        galViewport.addEventListener('mouseenter', function () { clearInterval(galAuto); });

        // lightbox
        var lightbox = document.getElementById('lightbox'), lbField = document.getElementById('lbField');
        document.getElementById('galExpand').onclick = function () {
            var item = galItems[gCur];
            lbField.textContent = (item.type === 'video' ? '▶ Video: ' : '📷 Photo: ') + item.caption.replace(' — add photo', '').replace(' — add video', '');
            lightbox.classList.add('open');
        };
        document.getElementById('lbClose').onclick = function () { lightbox.classList.remove('open'); };
        lightbox.addEventListener('click', function (e) { if (e.target === lightbox) lightbox.classList.remove('open'); });
        document.addEventListener('keydown', function (e) { if (e.key === 'Escape') lightbox.classList.remove('open'); });

        window.pbObserveReveal([document.querySelector('.gal-wrap')]);
    }

    /* ---------- booking (WhatsApp / email, direct) ---------- */
    function bookingText() {
        var name = document.getElementById('bName').value || '—';
        var phone = document.getElementById('bPhone').value || '—';
        var service = document.getElementById('bService').value;
        var barber = document.getElementById('bBarber').value;
        var date = document.getElementById('bDate').value || '—';
        var time = document.getElementById('bTime').value || '—';
        var note = document.getElementById('bNote').value;
        return "New booking request\nName: " + name + "\nPhone: " + phone + "\nService: " + service + "\nPreferred barber: " + barber + "\nDate: " + date + "\nTime: " + time + (note ? "\nNotes: " + note : "");
    }
    var bookWa = document.getElementById('bookWa');
    if (bookWa) {
        bookWa.onclick = function () {
            if (!document.getElementById('bName').value || !document.getElementById('bPhone').value) { alert('Please add your name and phone number.'); return; }
            window.open('https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(bookingText()), '_blank');
            setTimeout(function () { window.location.href = 'thank-you.html?type=booking'; }, 300);
        };
        document.getElementById('bookMail').onclick = function () {
            if (!document.getElementById('bName').value || !document.getElementById('bPhone').value) { alert('Please add your name and phone number.'); return; }
            window.location.href = 'mailto:' + EMAIL_ADDRESS + '?subject=' + encodeURIComponent('Booking request — ' + document.getElementById('bName').value) + '&body=' + encodeURIComponent(bookingText());
            setTimeout(function () { window.location.href = 'thank-you.html?type=booking'; }, 600);
        };
    }

    /* ---------- feedback form (submits directly, no email-app redirect) ---------- */
    var fbForm = document.getElementById('feedbackForm');
    if (fbForm) {
        var rating = 0;
        var starEls = fbForm.querySelectorAll('.stars span');
        var ratingInput = document.getElementById('fRatingInput');
        var fbNext = document.getElementById('fbNext');
        function paint(n) { starEls.forEach(function (x) { x.classList.toggle('hover-on', parseInt(x.getAttribute('data-v')) <= n); }); }
        starEls.forEach(function (s) {
            s.onclick = function () {
                rating = parseInt(s.getAttribute('data-v'));
                ratingInput.value = rating;
                starEls.forEach(function (x) { x.classList.toggle('on', parseInt(x.getAttribute('data-v')) <= rating); });
            };
            s.onmouseenter = function () { paint(parseInt(s.getAttribute('data-v'))); };
        });
        fbForm.querySelector('.stars').onmouseleave = function () { paint(0); };
        fbForm.addEventListener('submit', function () {
            fbNext.value = THANK_YOU_URL + '?type=feedback&rating=' + (rating || 0);
        });
    }

    /* ---------- academy enroll form (submits directly) ---------- */
    var enrollForm = document.getElementById('enrollForm');
    if (enrollForm) {
        document.getElementById('enrollNext').value = THANK_YOU_URL + '?type=enroll';
    }
})();