/**
 * ==============================================================================
 * LUXURY BABY SHOWER DIGITAL INVITATION — JAVASCRIPT CONTROLLER
 * ==============================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    // 1. Initialize Dynamic Content from Centralized invitationData
    try { initInvitationContent(); } catch (err) { console.error("initInvitationContent error:", err); }

    // 2. Initialize Welcome Screen Opening Experience
    try { initWelcomeExperience(); } catch (err) { console.error("initWelcomeExperience error:", err); }

    // 3. Initialize Live Countdown Timer
    try { initCountdownTimer(); } catch (err) { console.error("initCountdownTimer error:", err); }

    // 4. Initialize Calendar Integration (Google Calendar & .ics Download)
    try { initCalendarActions(); } catch (err) { console.error("initCalendarActions error:", err); }

    // 5. Initialize Venue & Map Actions
    try { initVenueActions(); } catch (err) { console.error("initVenueActions error:", err); }

    // 6. Initialize RSVP Logic & WhatsApp Integration
    try { initRsvpSection(); } catch (err) { console.error("initRsvpSection error:", err); }

    // 7. Initialize Royal Background Music (Audio / Synth)
    try { initMusicPlayer(); } catch (err) { console.error("initMusicPlayer error:", err); }

    // 8. Initialize Floating Golden Sparkles & Rose Petals Canvas
    try { initParticlesCanvas(); } catch (err) { console.error("initParticlesCanvas error:", err); }

    // 9. Initialize Scroll Reveal Animations & General Utilities
    try { initScrollReveal(); } catch (err) { console.error("initScrollReveal error:", err); }
    try { initShareAndScroll(); } catch (err) { console.error("initShareAndScroll error:", err); }
});

/**
 * ------------------------------------------------------------------------------
 * 1. HYDRATE DOM FROM invitationData
 * ------------------------------------------------------------------------------
 */
function initInvitationContent() {
    if (typeof invitationData === "undefined") {
        console.warn("invitationData object is not defined.");
        return;
    }

    const d = invitationData;

    // Helper to safely set text content
    const setText = (id, text) => {
        const el = document.getElementById(id);
        if (el && text !== undefined && text !== null) el.textContent = text;
    };

    // Helper to safely set HTML content
    const setHtml = (id, html) => {
        const el = document.getElementById(id);
        if (el && html !== undefined && html !== null) el.innerHTML = html;
    };

    // Welcome Screen
    setText("data-welcome-header", d.content.welcomeHeader);
    setText("data-welcome-sub", d.content.welcomeSubheader);
    setText("data-welcome-quote", `"${d.content.welcomeQuote}"`);
    setText("data-open-btn-text", d.content.openButtonText);

    // Main Invitation
    const father = d.family ? d.family.fatherName : (d.parents ? d.parents.fatherName : "Srinivasan");
    const mother = d.family ? d.family.motherName : (d.parents ? d.parents.motherName : "Pushpa");
    const celebrant = d.family ? d.family.celebratingName : "Thejaswini";
    const son = d.family ? d.family.sonName : "Vignesh";
    const lead = d.family ? d.family.invitationLead : d.parents.familyGreeting;
    const invTitle = d.family ? d.family.invitationTitle : d.parents.title;

    setText("data-family-greeting", lead);
    setHtml("data-parents-names", `${father.toUpperCase()} <span class="couple-ampersand">&amp;</span> ${mother.toUpperCase()}`);
    setText("data-invitation-title", invTitle);
    setText("data-celebrant-name", celebrant.toUpperCase());
    setHtml("data-celebrant-relation", `Wife of <strong class="son-name">${son}</strong>`);
    setText("data-invitation-sub", `"${d.content.invitationSubtitle}"`);
    setText("data-invitation-desc", `"${d.content.invitationDescription}"`);
    if (document.getElementById("data-ceremony-tag")) {
        setText("data-ceremony-tag", d.content.ceremonyBadge || "Baby Shower Ceremony");
    }

    // Event Date & Time (Calendar Card)
    if (document.getElementById("data-calendar-badge")) {
        setText("data-calendar-badge", d.content.saveTheDateBadge || "SAVE THE DATE");
    }
    setText("data-event-day", (d.event.day || "Wednesday").toUpperCase());
    setText("data-event-date", (d.event.dateFormatted || "11 November 2026").toUpperCase());
    if (document.getElementById("data-event-ceremony")) {
        setText("data-event-ceremony", d.content.ceremonyBadge || "Baby Shower Ceremony");
    }

    // Toggle Venue & Time visibility (hidden by default since not yet provided)
    const venueSection = document.getElementById("event-venue");
    if (venueSection) {
        venueSection.style.display = (d.features && d.features.showVenue) ? "block" : "none";
    }
    const timeBadge = document.querySelector(".event-time-badge");
    if (timeBadge) {
        timeBadge.style.display = (d.features && d.features.showEventTime) ? "inline-flex" : "none";
    }
    const quickVenue = document.getElementById("data-quick-venue");
    if (quickVenue) {
        quickVenue.style.display = (d.features && d.features.showVenue) ? "block" : "none";
    }


    // Venue section details (if enabled later)
    if (d.event.venue) {
        setText("data-venue-name", d.event.venue.name);
        setText("data-venue-subhall", d.event.venue.subTitle);
        setHtml("data-venue-address", d.event.venue.fullAddress);
        if (d.event.venue.landmark) {
            setText("data-venue-landmark", `Landmark: ${d.event.venue.landmark}`);
        }
    }

    // RSVP Section
    setText("data-rsvp-title", d.rsvp.title);
    setText("data-rsvp-subtitle", d.rsvp.subtitle);

    // Closing Section
    setText("data-closing-header", d.content.closingHeader);
    setText("data-closing-message", `"${d.content.closingMessage}"`);
    setText("data-closing-signoff", d.content.closingSignOff);
    setHtml("data-closing-parents", d.content.closingParents || `${father} &amp; ${mother}`);
    setHtml("data-closing-together", `Together with <strong class="closing-son">${son}</strong>`);
    setHtml("data-closing-celebrating", `Celebrating <span class="gold-text">${celebrant}</span>`);

    // Footer note
    const footerNote = document.querySelector(".footer-note");
    if (footerNote) {
        footerNote.innerHTML = `Handcrafted with love for ${celebrant} &bull; Baby Shower Digital Invitation`;
    }

    // Document Head / SEO Title
    if (d.seo && d.seo.metaTitle) {
        document.title = d.seo.metaTitle;
    }
}

/**
 * ------------------------------------------------------------------------------
 * 2. WELCOME SCREEN & OPENING ANIMATION
 * ------------------------------------------------------------------------------
 */
function initWelcomeExperience() {
    const welcomeScreen = document.getElementById("welcome-screen");
    const openBtn = document.getElementById("open-invitation-btn");
    const mainSection = document.getElementById("main-invitation");

    if (!welcomeScreen || !openBtn) return;

    openBtn.addEventListener("click", () => {
        // Add opened state to trigger CSS doors sliding & center fade
        welcomeScreen.classList.add("opened");

        // Immediately ensure main invitation section is revealed
        if (mainSection) {
            mainSection.classList.add("is-revealed");
        }

        // Try playing music as this is an explicit user touch/click gesture
        if (window.playBgMusic) {
            window.playBgMusic();
        }

        // Smooth scroll to main invitation card
        setTimeout(() => {
            if (mainSection) {
                mainSection.scrollIntoView({ behavior: "smooth" });
            }
        }, 300);

        // Remove from DOM accessibility tree after animation completes
        setTimeout(() => {
            welcomeScreen.style.display = "none";
            document.querySelectorAll(".reveal-on-scroll").forEach((el) => {
                const rect = el.getBoundingClientRect();
                if (rect.top < window.innerHeight + 150) {
                    el.classList.add("is-revealed");
                }
            });
            window.dispatchEvent(new Event("scroll"));
        }, 1200);
    });
}

/**
 * ------------------------------------------------------------------------------
 * 3. LIVE COUNTDOWN TIMER
 * ------------------------------------------------------------------------------
 */
/**
 * Helper to calculate timestamp for 00:00:00 (beginning of day) on event date in configured timezone
 */
function getBeginningOfDayTimestamp(dateStr, timeZone = "Asia/Kolkata") {
    try {
        const utcDate = new Date(`${dateStr}T00:00:00Z`);
        const formatter = new Intl.DateTimeFormat("en-US", {
            timeZone,
            year: "numeric", month: "2-digit", day: "2-digit",
            hour: "2-digit", minute: "2-digit", second: "2-digit",
            hour12: false
        });
        const parts = formatter.formatToParts(utcDate);
        const map = {};
        parts.forEach(({ type, value }) => { map[type] = value; });
        const tzDate = new Date(`${map.year}-${map.month}-${map.day}T${map.hour}:${map.minute}:${map.second}Z`);
        const offsetMs = tzDate.getTime() - utcDate.getTime();
        return utcDate.getTime() - offsetMs;
    } catch (e) {
        // Fallback for standard IST (+05:30) if Intl is not available
        return new Date(`${dateStr}T00:00:00+05:30`).getTime();
    }
}

function initCountdownTimer() {
    if (!invitationData.features || !invitationData.features.countdown) return;

    const daysEl = document.getElementById("countdown-days");
    const hoursEl = document.getElementById("countdown-hours");
    const minutesEl = document.getElementById("countdown-minutes");
    const secondsEl = document.getElementById("countdown-seconds");
    const timerContainer = document.getElementById("countdown-timer");

    if (!daysEl || !hoursEl || !minutesEl || !secondsEl || !timerContainer) return;

    // Configurable event date and timezone
    const dateStr = invitationData.event.date; // "2026-11-11"
    const tz = invitationData.event.timeZone || "Asia/Kolkata";
    const targetTime = getBeginningOfDayTimestamp(dateStr, tz);

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetTime - now;

        if (difference <= 0) {
            // Event has arrived
            timerContainer.innerHTML = `
                <div class="countdown-ended" style="grid-column: span 4;">
                    ✨ ${invitationData.content.eventConcludedMessage || "The celebration has begun! Showering blessings on Thejaswini and family!"}
                </div>
            `;
            return;
        }

        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        daysEl.textContent = String(days).padStart(2, "0");
        hoursEl.textContent = String(hours).padStart(2, "0");
        minutesEl.textContent = String(minutes).padStart(2, "0");
        secondsEl.textContent = String(seconds).padStart(2, "0");
    }

    updateCountdown();
    setInterval(updateCountdown, 1000);
}

/**
 * ------------------------------------------------------------------------------
 * 4. CALENDAR INTEGRATION (Google Calendar & .ics Download)
 * ------------------------------------------------------------------------------
 */
function initCalendarActions() {
    const googleBtn = document.getElementById("add-google-calendar-btn");
    const icsBtn = document.getElementById("download-ics-btn");

    const celebrant = invitationData.family ? invitationData.family.celebratingName : "Thejaswini";
    const son = invitationData.family ? invitationData.family.sonName : "Vignesh";
    const parents = invitationData.family ? invitationData.family.parentsCombined : "Srinivasan & Pushpa";

    const title = encodeURIComponent(`Baby Shower Ceremony — ${celebrant}`);
    const details = encodeURIComponent(`Baby Shower Ceremony celebrating ${celebrant} (Wife of ${son}). Hosted with love and blessings by ${parents}.`);
    const location = (invitationData.features && invitationData.features.showVenue && invitationData.event.venue.fullAddress)
        ? encodeURIComponent(invitationData.event.venue.fullAddress)
        : encodeURIComponent("Venue to be announced");

    // All-day calendar date format: YYYYMMDD
    const dateRaw = invitationData.event.date.replace(/-/g, ""); // "20261111"
    const nextDay = new Date(invitationData.event.date);
    nextDay.setDate(nextDay.getDate() + 1);
    const nextDateRaw = nextDay.toISOString().slice(0, 10).replace(/-/g, "");

    if (googleBtn) {
        googleBtn.addEventListener("click", () => {
            const googleUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${title}&dates=${dateRaw}/${nextDateRaw}&details=${details}&location=${location}`;
            window.open(googleUrl, "_blank", "noopener,noreferrer");
        });
    }

    if (icsBtn) {
        icsBtn.addEventListener("click", () => {
            const icsLocation = (invitationData.features && invitationData.features.showVenue && invitationData.event.venue.fullAddress)
                ? invitationData.event.venue.fullAddress
                : "Venue to be announced";

            const icsData = [
                "BEGIN:VCALENDAR",
                "VERSION:2.0",
                "PRODID:-//Luxury Invitation//Baby Shower Ceremony//EN",
                "CALSCALE:GREGORIAN",
                "BEGIN:VEVENT",
                `SUMMARY:Baby Shower Ceremony — ${celebrant}`,
                `DESCRIPTION:Baby Shower Ceremony celebrating ${celebrant} (Wife of ${son}). Hosted by ${parents}.`,
                `LOCATION:${icsLocation}`,
                `DTSTART;VALUE=DATE:${dateRaw}`,
                `DTEND;VALUE=DATE:${nextDateRaw}`,
                "STATUS:CONFIRMED",
                "END:VEVENT",
                "END:VCALENDAR"
            ].join("\r\n");

            const blob = new Blob([icsData], { type: "text/calendar;charset=utf-8" });
            const link = document.createElement("a");
            link.href = window.URL.createObjectURL(blob);
            link.setAttribute("download", `Baby_Shower_Ceremony_${celebrant}.ics`);
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            showToast("Calendar invite downloaded!");
        });
    }
}


/**
 * ------------------------------------------------------------------------------
 * 6. VENUE & MAP ACTIONS
 * ------------------------------------------------------------------------------
 */
function initVenueActions() {
    const directionsBtn = document.getElementById("venue-directions-btn");
    const copyAddressBtn = document.getElementById("copy-address-btn");

    if (directionsBtn) {
        const mapUrl = invitationData.event.venue.googleMapsUrl || 
            `https://maps.google.com/?q=${encodeURIComponent(invitationData.event.venue.fullAddress)}`;
        directionsBtn.href = mapUrl;
    }

    if (copyAddressBtn) {
        copyAddressBtn.addEventListener("click", () => {
            const fullAddress = invitationData.event.venue.fullAddress;
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(fullAddress).then(() => {
                    showToast("Venue address copied to clipboard!");
                }).catch(() => {
                    fallbackCopyText(fullAddress);
                });
            } else {
                fallbackCopyText(fullAddress);
            }
        });
    }

    function fallbackCopyText(text) {
        const textarea = document.createElement("textarea");
        textarea.value = text;
        textarea.style.position = "fixed";
        textarea.style.opacity = "0";
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand("copy");
            showToast("Venue address copied to clipboard!");
        } catch (err) {
            showToast("Address: " + text);
        }
        document.body.removeChild(textarea);
    }
}

/**
 * ------------------------------------------------------------------------------
 * 7. RSVP SECTION & WHATSAPP INTEGRATION
 * ------------------------------------------------------------------------------
 */
function initRsvpSection() {
    const form = document.getElementById("rsvp-form");
    const labelAccept = document.getElementById("label-accept");
    const labelDecline = document.getElementById("label-decline");
    const guestsGroup = document.getElementById("guests-count-group");
    const guestDisplay = document.getElementById("guest-count-num");
    const guestInput = document.getElementById("rsvp-guests-count");
    const decBtn = document.getElementById("counter-decrement");
    const incBtn = document.getElementById("counter-increment");
    const whatsappBtn = document.getElementById("rsvp-whatsapp-btn");
    const modal = document.getElementById("rsvp-modal");
    const modalClose = document.getElementById("rsvp-modal-close");
    const modalGuestName = document.getElementById("modal-guest-name");

    let count = 2;
    let currentAttendance = "attending";

    // Guest Counter Increment / Decrement
    if (decBtn && incBtn && guestDisplay && guestInput) {
        decBtn.addEventListener("click", () => {
            if (count > 1) {
                count--;
                guestDisplay.textContent = count;
                guestInput.value = count;
                updateWhatsAppLink();
            }
        });

        incBtn.addEventListener("click", () => {
            if (count < 10) {
                count++;
                guestDisplay.textContent = count;
                guestInput.value = count;
                updateWhatsAppLink();
            }
        });
    }

    // Radio Pill Selection Styling
    if (labelAccept && labelDecline) {
        labelAccept.addEventListener("click", () => {
            currentAttendance = "attending";
            labelAccept.classList.add("selected-accept");
            labelDecline.classList.remove("selected-decline");
            if (guestsGroup) guestsGroup.style.display = "block";
            updateWhatsAppLink();
        });

        labelDecline.addEventListener("click", () => {
            currentAttendance = "declining";
            labelDecline.classList.add("selected-decline");
            labelAccept.classList.remove("selected-accept");
            if (guestsGroup) guestsGroup.style.display = "none";
            updateWhatsAppLink();
        });
    }

    // Dynamic WhatsApp RSVP Message Generator
    function updateWhatsAppLink() {
        if (!whatsappBtn) return;
        const nameInput = document.getElementById("rsvp-name");
        const guestName = (nameInput && nameInput.value.trim()) ? nameInput.value.trim() : "Guest";
        const messageInput = document.getElementById("rsvp-message");
        const note = (messageInput && messageInput.value.trim()) ? `\nMessage: "${messageInput.value.trim()}"` : "";

        const celebrant = invitationData.family ? invitationData.family.celebratingName : "Thejaswini";
        const son = invitationData.family ? invitationData.family.sonName : "Vignesh";
        const parents = invitationData.family ? invitationData.family.parentsCombined : "Srinivasan & Pushpa";

        let text = "";
        if (currentAttendance === "attending") {
            text = `Hello ${parents}, ${son} & ${celebrant}! ✨\nI am joyfully confirming my attendance for the Baby Shower Ceremony of ${celebrant} on ${invitationData.event.dateFormatted}.\n\nGuest Name: ${guestName}\nAttending: ${count} guest(s)${note}\n\nLooking forward to celebrating with you!`;
        } else {
            text = `Hello ${parents}, ${son} & ${celebrant}! ✨\nSending my warmest love and blessings for the Baby Shower Ceremony of ${celebrant}. Unfortunately, I regretfully will not be able to attend in person.\n\nGuest Name: ${guestName}${note}\n\nWishing ${celebrant} and the family boundless happiness!`;
        }

        const phone = (invitationData.rsvp && invitationData.rsvp.hostWhatsAppNumber)
            ? invitationData.rsvp.hostWhatsAppNumber.trim()
            : "";
        whatsappBtn.href = phone
            ? `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
            : `https://wa.me/?text=${encodeURIComponent(text)}`;
    }

    const nameInput = document.getElementById("rsvp-name");
    const msgInput = document.getElementById("rsvp-message");
    if (nameInput) nameInput.addEventListener("input", updateWhatsAppLink);
    if (msgInput) msgInput.addEventListener("input", updateWhatsAppLink);
    updateWhatsAppLink();

    // Form Submit Handler
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();

            const nameVal = nameInput ? nameInput.value.trim() : "";
            if (!nameVal) {
                nameInput.focus();
                showToast("Please enter your name to confirm RSVP.");
                return;
            }

            // Display Feedback Modal
            if (modalGuestName) modalGuestName.textContent = nameVal;
            if (modal) modal.classList.add("active");

            // Form Reset
            form.reset();
            count = 2;
            if (guestDisplay) guestDisplay.textContent = count;
            if (guestInput) guestInput.value = count;
            labelAccept.click();
        });
    }

    if (modalClose && modal) {
        modalClose.addEventListener("click", () => {
            modal.classList.remove("active");
        });
        modal.addEventListener("click", (e) => {
            if (e.target === modal) modal.classList.remove("active");
        });
    }
}

/**
 * ------------------------------------------------------------------------------
 * 8. ROYAL BACKGROUND MUSIC (Generative Classical Indian Lullaby / Audio File)
 * ------------------------------------------------------------------------------
 */
function initMusicPlayer() {
    if (!invitationData.features.backgroundMusic) return;

    const musicBtn = document.getElementById("music-toggle-btn");
    const musicBars = musicBtn ? musicBtn.querySelector(".music-bars") : null;
    const musicIcon = musicBtn ? musicBtn.querySelector(".music-icon-muted") : null;

    let isPlaying = false;
    let audioContext = null;
    let synthTimer = null;
    let externalAudio = null;

    // Check if an external audio file exists
    if (invitationData.audio.fileUrl) {
        externalAudio = new Audio(invitationData.audio.fileUrl);
        externalAudio.loop = true;
    }

    // Procedural Indian Classical Ambient Lullaby (Raga Mohanam / Bhupali: C4, D4, E4, G4, A4, C5)
    // Dreamy, meditative, royal palace atmosphere
    const mohanamNotes = [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 659.25, 783.99];

    function playIndianSitarHarpTone(freq, duration = 2.5, timeOffset = 0) {
        if (!audioContext) return;
        const now = audioContext.currentTime + timeOffset;

        // Fundamental oscillator (gentle sine + warm triangle)
        const osc1 = audioContext.createOscillator();
        const osc2 = audioContext.createOscillator();
        const gainNode = audioContext.createGain();

        osc1.type = "sine";
        osc1.frequency.setValueAtTime(freq, now);

        osc2.type = "triangle";
        osc2.frequency.setValueAtTime(freq * 2, now); // Sweet harmonic shimmer

        // Gentle acoustic attack & decay envelope
        gainNode.gain.setValueAtTime(0.001, now);
        gainNode.gain.exponentialRampToValueAtTime(0.08, now + 0.15);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, now + duration);

        osc1.connect(gainNode);
        osc2.connect(gainNode);
        gainNode.connect(audioContext.destination);

        osc1.start(now);
        osc2.start(now);
        osc1.stop(now + duration);
        osc2.stop(now + duration);
    }

    function startGenerativeMusic() {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioContext.state === "suspended") {
            audioContext.resume();
        }

        let step = 0;
        // Melodic soothing pattern
        const melody = [0, 2, 4, 3, 5, 4, 2, 1, 0, 3, 4, 5, 7, 5, 4, 2];

        function loop() {
            if (!isPlaying) return;
            const noteIndex = melody[step % melody.length];
            const noteFreq = mohanamNotes[noteIndex % mohanamNotes.length];
            
            // Play lead harp tone
            playIndianSitarHarpTone(noteFreq, 3.0, 0);

            // Add occasional low warm drone (Tanpura Sa)
            if (step % 4 === 0) {
                playIndianSitarHarpTone(130.81, 4.0, 0.05); // Low C3 drone
            }

            step++;
            synthTimer = setTimeout(loop, 900);
        }

        loop();
    }

    function stopMusic() {
        isPlaying = false;
        if (synthTimer) clearTimeout(synthTimer);
        if (externalAudio) {
            externalAudio.pause();
        }
        if (musicBtn) {
            musicBtn.classList.remove("playing");
            if (musicBars) musicBars.style.display = "none";
            if (musicIcon) musicIcon.style.display = "block";
        }
    }

    function startMusic() {
        isPlaying = true;
        if (musicBtn) {
            musicBtn.classList.add("playing");
            if (musicBars) musicBars.style.display = "flex";
            if (musicIcon) musicIcon.style.display = "none";
        }

        // Try external audio first, with fallback to procedural lullaby if missing or blocked
        if (externalAudio) {
            const playPromise = externalAudio.play();
            if (playPromise !== undefined) {
                playPromise.catch((err) => {
                    console.warn("External audio playback error, falling back to synth:", err);
                    if (invitationData.audio && invitationData.audio.useBuiltInSynthIfFileMissing) {
                        startGenerativeMusic();
                    }
                });
            }
        } else if (invitationData.audio && invitationData.audio.useBuiltInSynthIfFileMissing) {
            startGenerativeMusic();
        }
    }

    // Expose globally so Welcome Screen can trigger on user gesture
    window.playBgMusic = () => {
        if (!isPlaying) startMusic();
    };

    if (musicBtn) {
        musicBtn.addEventListener("click", () => {
            if (isPlaying) {
                stopMusic();
                showToast("Music paused");
            } else {
                startMusic();
                showToast("Playing gentle raga lullaby ♪");
            }
        });
    }
}

/**
 * ------------------------------------------------------------------------------
 * 9. FLOATING GOLDEN SPARKLES & ROSE PETALS CANVAS
 * ------------------------------------------------------------------------------
 */
function initParticlesCanvas() {
    if (!invitationData.features.floatingPetals) return;

    // Check user accessibility preference
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        return;
    }

    const canvas = document.getElementById("particles-canvas");
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    window.addEventListener("resize", () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = window.innerWidth < 420 ? 16 : (window.innerWidth < 768 ? 24 : 45);

    // Types: 'sparkle' (gold dust), 'petal' (soft pink/rose petal)
    for (let i = 0; i < particleCount; i++) {
        particles.push({
            type: Math.random() > 0.4 ? "sparkle" : "petal",
            x: Math.random() * width,
            y: Math.random() * height,
            radius: Math.random() * 2.5 + 1,
            speedY: Math.random() * 0.7 + 0.3,
            speedX: (Math.random() - 0.5) * 0.5,
            opacity: Math.random() * 0.7 + 0.2,
            angle: Math.random() * Math.PI * 2,
            angularSpeed: (Math.random() - 0.5) * 0.02,
            petalSize: Math.random() * 6 + 6
        });
    }

    let isTabVisible = true;
    document.addEventListener("visibilitychange", () => {
        isTabVisible = !document.hidden;
    });

    function draw() {
        if (!isTabVisible) {
            requestAnimationFrame(draw);
            return;
        }

        ctx.clearRect(0, 0, width, height);

        for (let i = 0; i < particles.length; i++) {
            const p = particles[i];

            // Move
            p.y += p.speedY;
            p.x += Math.sin(p.angle) * 0.4 + p.speedX;
            p.angle += p.angularSpeed;

            // Wrap around
            if (p.y > height + 20) {
                p.y = -20;
                p.x = Math.random() * width;
            }
            if (p.x > width + 20) p.x = -20;
            if (p.x < -20) p.x = width + 20;

            if (p.type === "sparkle") {
                // Golden shimmering particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(212, 175, 114, ${p.opacity * (0.6 + Math.sin(p.angle * 2) * 0.4)})`;
                ctx.shadowBlur = 6;
                ctx.shadowColor = "#D4AF72";
                ctx.fill();
                ctx.shadowBlur = 0;
            } else {
                // Delicate Rose / Jasmine Petal
                ctx.save();
                ctx.translate(p.x, p.y);
                ctx.rotate(p.angle);
                ctx.beginPath();
                ctx.moveTo(0, 0);
                ctx.bezierCurveTo(p.petalSize / 2, -p.petalSize / 2, p.petalSize, -p.petalSize / 4, p.petalSize, 0);
                ctx.bezierCurveTo(p.petalSize, p.petalSize / 4, p.petalSize / 2, p.petalSize / 2, 0, 0);
                ctx.fillStyle = `rgba(217, 166, 160, ${p.opacity * 0.8})`;
                ctx.fill();
                ctx.restore();
            }
        }

        requestAnimationFrame(draw);
    }

    draw();
}

/**
 * ------------------------------------------------------------------------------
 * 10. SCROLL REVEAL & GENERAL UTILITIES
 * ------------------------------------------------------------------------------
 */
function initScrollReveal() {
    const reveals = document.querySelectorAll(".reveal-on-scroll");

    const checkVisible = () => {
        reveals.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight + 150) {
                el.classList.add("is-revealed");
            }
        });
    };

    // Immediately reveal visible elements
    checkVisible();

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-revealed");
                }
            });
        }, {
            threshold: 0.05,
            rootMargin: "80px 0px 80px 0px"
        });

        reveals.forEach((el) => observer.observe(el));
    } else {
        window.addEventListener("scroll", checkVisible, { passive: true });
    }
}

function initShareAndScroll() {
    const shareBtn = document.getElementById("share-invitation-btn");
    const scrollTopBtn = document.getElementById("scroll-to-top-btn");

    if (shareBtn) {
        shareBtn.addEventListener("click", () => {
            const celebrant = invitationData.family ? invitationData.family.celebratingName : "Thejaswini";
            const parents = invitationData.family ? invitationData.family.parentsCombined : "Srinivasan & Pushpa";
            const shareTitle = `Baby Shower Ceremony — ${celebrant}`;
            const shareText = `With the blessings of ${parents}, join us to celebrate the Baby Shower Ceremony of ${celebrant} on ${invitationData.event.dateFormatted}!`;
            const shareUrl = window.location.href;

            if (navigator.share) {
                navigator.share({
                    title: shareTitle,
                    text: shareText,
                    url: shareUrl
                }).catch(() => {
                    // Ignored if user cancels share
                });
            } else {
                // Clipboard fallback
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(shareUrl).then(() => {
                        showToast("Invitation link copied to clipboard!");
                    });
                } else {
                    showToast("Share: " + shareUrl);
                }
            }
        });
    }

    if (scrollTopBtn) {
        scrollTopBtn.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }
}

/**
 * Toast Notification Utility
 */
function showToast(message) {
    const toast = document.getElementById("toast-notification");
    if (!toast) return;

    toast.textContent = message;
    toast.classList.add("show");

    if (window.toastTimer) clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3200);
}
