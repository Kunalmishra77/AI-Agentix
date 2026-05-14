// ─── Google Calendar Service ───────────────────────────────────────────────
import { google } from 'googleapis';

/**
 * Build an authenticated Google Calendar client.
 * Uses OAuth2 with a stored refresh token (one-time admin setup via /oauth/init).
 */
function getCalendarClient() {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET,
    process.env.GOOGLE_REDIRECT_URI
  );

  oauth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  });

  return google.calendar({ version: 'v3', auth: oauth2Client });
}

/**
 * Create a demo booking event on the AGENTiX Google Calendar.
 *
 * @param {Object} lead
 * @param {string} lead.name
 * @param {string} lead.email
 * @param {string} lead.company
 * @param {string} lead.solutionNeed
 * @param {string} lead.preferredDate  e.g. "May 20"
 * @param {string} lead.preferredTime  e.g. "2 PM IST"
 * @returns {Promise<string>} Google Calendar event ID
 */
export async function createDemoEvent(lead) {
  const calendar = getCalendarClient();

  // Parse preferred time into a real date (default: tomorrow 2 PM IST)
  const eventStart = parsePreferredDateTime(lead.preferredDate, lead.preferredTime);
  const eventEnd   = new Date(eventStart.getTime() + 45 * 60 * 1000); // 45 min

  const event = {
    summary: `AGENTiX Demo — ${lead.name}${lead.company ? ` (${lead.company})` : ''}`,
    description: [
      `Lead Name: ${lead.name}`,
      `Email: ${lead.email}`,
      `Company: ${lead.company || 'N/A'}`,
      `Solution Need: ${lead.solutionNeed || 'Discussed via Voice Advisor'}`,
      `Preferred Time: ${lead.preferredDate || 'Flexible'} ${lead.preferredTime || ''}`,
      '',
      'Booked via AGENTiX Voice Advisor Widget.',
    ].join('\n'),
    start: {
      dateTime: eventStart.toISOString(),
      timeZone: 'Asia/Kolkata',
    },
    end: {
      dateTime: eventEnd.toISOString(),
      timeZone: 'Asia/Kolkata',
    },
    attendees: [
      { email: lead.email, displayName: lead.name },
      { email: process.env.AGENTIX_CALENDAR_EMAIL || process.env.EMAIL_TO },
    ],
    conferenceData: {
      createRequest: {
        requestId: `agentix-demo-${Date.now()}`,
        conferenceSolutionKey: { type: 'hangoutsMeet' },
      },
    },
    reminders: {
      useDefault: false,
      overrides: [
        { method: 'email', minutes: 24 * 60 },
        { method: 'popup', minutes: 30 },
      ],
    },
  };

  const response = await calendar.events.insert({
    calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
    resource: event,
    conferenceDataVersion: 1,
    sendUpdates: 'all',   // sends email invites to all attendees
  });

  return response.data.id;
}

/**
 * Robust date/time parser for user-supplied strings like:
 *   dateStr: "May 20", "20 May", "May 20th", "20th May"
 *   timeStr: "2 PM IST", "2pm", "14:00", "2 PM", "2:30 PM IST"
 *
 * Falls back to next business day 2 PM if parsing fails.
 */
function parsePreferredDateTime(dateStr, timeStr) {
  try {
    const MONTHS = [
      'january','february','march','april','may','june',
      'july','august','september','october','november','december'
    ];
    const MONTHS_SHORT = [
      'jan','feb','mar','apr','may','jun',
      'jul','aug','sep','oct','nov','dec'
    ];

    // ── Parse Day & Month ─────────────────────────────────────────────────
    let month = -1;
    let day   = -1;

    if (dateStr) {
      const clean = dateStr.toLowerCase().replace(/(\d+)(st|nd|rd|th)/g, '$1').trim();

      // Find month name (full or short)
      for (let i = 0; i < MONTHS.length; i++) {
        if (clean.includes(MONTHS[i]) || clean.includes(MONTHS_SHORT[i])) {
          month = i;   // 0-indexed
          break;
        }
      }

      // Find numeric day
      const dayMatch = clean.match(/\d+/);
      if (dayMatch) day = parseInt(dayMatch[0], 10);
    }

    // ── Parse Hour & Minute ───────────────────────────────────────────────
    let hours   = 14;  // default 2 PM
    let minutes = 0;

    if (timeStr) {
      // Strip timezone labels (IST, UTC, GMT, EST, PST …)
      const clean = timeStr.toLowerCase()
        .replace(/\b(ist|utc|gmt|est|pst|cst|mst|bst|cet)\b/g, '')
        .trim();

      // Match: "2", "2:30", "14", "14:30" optionally followed by am/pm
      const m = clean.match(/(\d{1,2})(?::(\d{2}))?\s*(am|pm)?/);
      if (m) {
        hours   = parseInt(m[1], 10);
        minutes = m[2] ? parseInt(m[2], 10) : 0;
        const meridiem = m[3];

        if (meridiem === 'pm' && hours !== 12) hours += 12;
        if (meridiem === 'am' && hours === 12) hours = 0;

        // If no am/pm but hour < 8, assume PM (business context)
        if (!meridiem && hours > 0 && hours < 8) hours += 12;
      }
    }

    // ── Build Date Object ─────────────────────────────────────────────────
    if (month !== -1 && day !== -1 && day >= 1 && day <= 31) {
      const now  = new Date();
      let   year = now.getFullYear();

      // new Date(year, month, day, hours, minutes) — uses LOCAL timezone
      let eventDate = new Date(year, month, day, hours, minutes, 0, 0);

      // If the constructed date is already in the past, push to next year
      if (eventDate <= now) {
        eventDate = new Date(year + 1, month, day, hours, minutes, 0, 0);
      }

      console.log(`[calendarService] Parsed event date: ${eventDate.toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })} IST`);
      return eventDate;
    }

    console.warn(`[calendarService] Could not parse date="${dateStr}" time="${timeStr}" — using fallback`);
  } catch (err) {
    console.error('[calendarService] Date parse error:', err.message);
  }

  // ── Fallback: next business day at 2 PM local time ────────────────────
  const fallback = new Date();
  fallback.setDate(fallback.getDate() + 1);
  fallback.setHours(14, 0, 0, 0);
  return fallback;
}
