# Royal Luxury Baby Shower Digital Invitation — Thejaswini

An elegant, royal, and luxurious single-page digital invitation website crafted with traditional Indian palace celebration aesthetics and modern luxury editorial design.

---

## ✨ Features & Highlights

1. **Section 1: Grand Welcome Screen & Opening Experience**
   - Full-screen ivory background with ornamental gold frame, cusped Indian palace arch motif, and floating golden dust and delicate rose petals.
   - Interactive royal wax seal / gold button ("OPEN INVITATION") that smoothly slides open palace entrance doors and gently scrolls to the invitation.
   - Seamless trigger for soothing background music on touch/click.

2. **Section 2: The Main Holy Invitation**
   - Traditional auspicious invocation (*Om Sri Ganeshaya Namaha*).
   - "With the blessings of our beloved parents" — **Srinivasan & Pushpa**.
   - Inviting guests to celebrate the Baby Shower Ceremony of their beloved daughter-in-law, **THEJASWINI** (Wife of **Vignesh**).
   - Elegant typography blending Cormorant Garamond, Great Vibes script, and Lato with champagne gold accents.

3. **Section 3: Event Date & Live Countdown**
   - Calendar-card design with Save the Date, day (**Wednesday**), date (**11 November 2026**), and occasion (**Baby Shower Ceremony**).
   - Live real-time countdown timer (Days, Hours, Minutes, Seconds) dynamically computed to the beginning of 11 November 2026 in the configured timezone (`Asia/Kolkata`).
   - Venue displayed (**Varthakara Bhavana**, Chamarajanagar).
   - **Google Calendar** integration and instant **Apple / Outlook (.ics)** file generation with venue location.



6. **Section 6: Event Venue & Interactive Map**
   - Features **Varthakara Bhavana** (Kalyana Mantapa & Community Hall), B.R. Double Road, Bhagirath Nagar, Chamarajanagar, Karnataka.
   - Embedded interactive **Google Map** location frame with luxury gold border styling.
   - Direct **Get Directions on Google Maps** navigation and one-click address clipboard copying.

7. **Section 7: Interactive RSVP Interface**
   - Form fields for Guest Name, Attendance choice (*Joyfully Accept* / *Regretfully Decline*), Guest Count (`+` / `-` controls), and optional warm blessings/dietary notes.
   - Client-side validation to ensure names are entered.
   - Transparent preview mode notice clarifying that submissions are not permanently stored until a backend service is connected.
   - **Quick RSVP via WhatsApp**: dynamically constructs a prefilled message addressed to the family with all celebration details.

8. **Section 8: Closing Blessings & Footer**
   - Warm closing signoff from **Srinivasan & Pushpa**, together with **Vignesh**, celebrating **Thejaswini**.
   - Native Web Share API integration (for WhatsApp, Messages, Instagram) with clipboard fallback.
   - Smooth scroll-to-top button.

9. **Music & Audio Atmosphere**
   - Built-in soothing Indian classical raga ambient lullaby (*Raga Mohanam / Bhupali*) synthesized procedurally via Web Audio API, or configurable external audio file in `assets/music/`.
   - Fixed top-right audio toggle with animated equalizer soundbars.

---

## 📁 Project Structure

```
baby-shower-invitation/
│
├── index.html              # Semantic HTML5 markup with SEO & Open Graph meta tags
├── css/
│   └── style.css           # Luxury design system, CSS tokens, animations, responsive rules
├── js/
│   ├── data.js             # ★ CENTRALIZED CONFIGURATION (All details configurable here)
│   └── script.js           # Interactive controller (countdown, audio, lightbox, RSVP, canvas)
├── assets/
│   ├── images/
│   │   ├── gallery-1.jpg   # Maternity portrait
│   │   ├── gallery-2.jpg   # Couple portrait
│   │   ├── gallery-3.jpg   # Venue & flower decor
│   │   ├── gallery-4.jpg   # Traditional ceremony details
│   │   └── og-preview.jpg  # WhatsApp/Social link preview image
│   ├── music/
│   │   └── lullaby.mp3     # (Optional) custom audio file
│   └── icons/
└── README.md
```

---

## 🛠️ Centralized Configuration

All names, dates, venue placeholders, messages, and contact details are stored in:

👉 **[`js/data.js`](file:///d:/baby%20shower/js/data.js)**

### Family Details in `js/data.js`:
```javascript
family: {
    fatherName: "Srinivasan",
    motherName: "Pushpa",
    parentsCombined: "Srinivasan & Pushpa",
    sonName: "Vignesh",
    wifeName: "Thejaswini",
    celebratingName: "Thejaswini",
    sonTitle: "Wife of Vignesh",
    invitationLead: "With the blessings of our beloved parents",
    invitationTitle: "joyfully invite you to celebrate the Baby Shower Ceremony of their beloved daughter-in-law,"
}
```

### Event Date & Timezone:
```javascript
event: {
    date: "2026-11-11",          // YYYY-MM-DD format
    day: "Wednesday",
    dateFormatted: "11 November 2026",
    time: "To be announced",
    timeZone: "Asia/Kolkata"
}
```

### Enabling Venue and Event Time when finalized:
In `js/data.js`:
```javascript
features: {
    showVenue: true,       // Set to true once venue is announced
    showEventTime: true    // Set to true once time is announced
}
```

---

## 🚀 Deployment (Free Static Hosting)

The website uses zero build tools or dependencies and runs on any static web host:

### GitHub Pages
1. Push this folder to a GitHub repository.
2. In GitHub, go to **Settings** > **Pages**.
3. Under **Branch**, select `main` and `/ (root)`, then click **Save**.
4. Your website URL will be live in 1–2 minutes!
