/* The JARVIS WhatsApp chat. */
export const WA_NUMBER = "918755520499"; // the JARVIS WhatsApp number (Saurabh, 2026-10-06), digits only with the country code

/* "Try Jarvis" in the header and the home hero opens this chat with a plain-text hello (no emoji: WhatsApp showed it as �). */
export const JARVIS_WA = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent("Hi JARVIS, I'd like to start.")}`;
