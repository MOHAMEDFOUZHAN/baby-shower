/**
 * ==============================================================================
 * LUXURY BABY SHOWER DIGITAL INVITATION — CENTRALIZED CONFIGURATION DATA
 * ==============================================================================
 * 
 * All event details, family names, dates, messages, and configuration toggles are
 * centralized here. To update the invitation details, modify the values in this object.
 */

const invitationData = {
    // Basic Event Classification & Cultural Details
    eventType: "Baby Shower",
    ceremonyName: "Baby Shower Ceremony",
    tagline: "A Beautiful Celebration of Motherhood",

    // Family Details
    family: {
        // Parents of the son
        fatherName: "Srinivasan",
        motherName: "Pushpa",
        parentsCombined: "Srinivasan & Pushpa",
        
        // Son & Wife (Parents-to-be)
        sonName: "Vignesh",
        wifeName: "Thejaswini",
        celebratingName: "Thejaswini",
        
        // Relationship & Invitation Lead
        sonTitle: "Wife of Vignesh",
        invitationLead: "With the blessings of our beloved parents",
        invitationTitle: "joyfully invite you to celebrate the Baby Shower Ceremony of their beloved daughter-in-law,"
    },

    // Backward compatibility aliases
    parents: {
        fatherName: "Srinivasan",
        motherName: "Pushpa",
        combinedNames: "Srinivasan & Pushpa",
        familyGreeting: "With the blessings of our beloved parents",
        title: "joyfully invite you to celebrate the Baby Shower Ceremony of their beloved daughter-in-law,"
    },

    // Event Date, Time & Location Details
    event: {
        // Date format: YYYY-MM-DD for reliable JavaScript Date parsing
        date: "2026-11-11",
        day: "Wednesday",
        dateFormatted: "11 November 2026",
        // Event time has not been provided; kept as configurable placeholder
        time: "To be announced",
        timeZone: "Asia/Kolkata",
        
        // Configurable venue details
        venue: {
            name: "Varthakara Bhavana",
            subTitle: "Kalyana Mantapa & Community Hall",
            addressLine1: "B.R. Double Road, Bhagirath Nagar",
            city: "Chamarajanagar",
            state: "Karnataka",
            country: "India",
            pincode: "571313",
            fullAddress: "Varthakara Bhavana, B.R. Double Road, Bhagirath Nagar, Chamarajanagar, Karnataka – 571313",
            googleMapsUrl: "https://maps.google.com/?q=Varthakara+Bhavana,+B.R.+Double+Road,+Chamarajanagar,+Karnataka+571313",
            googleShareUrl: "https://share.google/boir4mrsS34Iw4s5H",
            embedMapUrl: "https://maps.google.com/maps?q=Varthakara+Bhavana,+B.R.+Double+Road,+Chamarajanagar,+Karnataka+571313&t=&z=16&ie=UTF8&iwloc=&output=embed",
            landmark: "Near Double Road, Chamarajanagar"
        }
    },

    // Emotional Storytelling & Content Sections
    content: {
        // Opening Screen
        welcomeHeader: "WITH LOVE AND BLESSINGS",
        welcomeSubheader: "A Beautiful Celebration of Motherhood",
        welcomeQuote: "Celebrating the joy of a little miracle on the way",
        openButtonText: "OPEN INVITATION",

        // Main Invitation
        invitationSubtitle: "An Auspicious Day Filled with Love, Joy & Blessings",
        invitationDescription: "Please join us as we celebrate this beautiful journey into motherhood and shower Thejaswini with your love, blessings, and best wishes.",

        // Save the Date Card
        saveTheDateBadge: "SAVE THE DATE",
        ceremonyBadge: "Baby Shower Ceremony",

        // Closing Section
        closingHeader: "With Love & Blessings",
        closingMessage: "Your presence will make our celebration truly special.",
        closingSignOff: "With warm regards,",
        closingParents: "Srinivasan & Pushpa",
        closingSon: "Together with Vignesh",
        closingCelebrating: "Celebrating Thejaswini",

        eventConcludedMessage: "The celebration has begun! Thank you for showering Thejaswini and our family with love & blessings."
    },

    // Blessings & Warm Wishes Configuration
    rsvp: {
        eyebrow: "Shower Your Love",
        title: "Send Your Blessings",
        subtitle: "Your warm wishes, prayers, and heartfelt blessings will shower Thejaswini and our family with boundless joy.",
        hostWhatsAppNumber: "", // Configurable host WhatsApp number (e.g., '919876543210')
        hostEmail: ""
    },

    // Audio / Background Music
    audio: {
        title: "Soothing Raga Mohanam - Instrumental Lullaby",
        fileUrl: "assets/music/lullaby.mp3",
        useBuiltInSynthIfFileMissing: true
    },

    // Feature Toggles
    features: {
        countdown: true,
        rsvp: true,
        backgroundMusic: true,
        floatingPetals: true,
        shareInvitation: true,
        // Venue details enabled for Varthakara Bhavana
        showVenue: true,
        showEventTime: false
    },

    // Social Sharing & Open Graph Metadata
    seo: {
        metaTitle: "Baby Shower Ceremony | Thejaswini | 11 November 2026",
        metaDescription: "With the blessings of Srinivasan & Pushpa, join us to celebrate the Baby Shower Ceremony of Thejaswini, wife of Vignesh, on Wednesday, 11 November 2026.",
        shareImageUrl: "assets/images/og-preview.jpg",
        siteUrl: ""
    }
};

// Export for module environments or assign to global window for vanilla browser usage
if (typeof module !== "undefined" && module.exports) {
    module.exports = invitationData;
}
