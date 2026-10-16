import {onDocumentCreated} from "firebase-functions/v2/firestore";
import {google} from "googleapis";
import * as admin from "firebase-admin";

admin.initializeApp();

const auth = new google.auth.GoogleAuth({
  keyFile: "service-account.json",
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

const calendar = google.calendar({version: "v3", auth});

export const addBookingToCalendar = onDocumentCreated(
  "bookings/{bookingId}",
  async (event) => {
    const snap = event.data;
    if (!snap) {
      console.log("No snapshot data found");
      return;
    }

    const booking = snap.data();

    const calendarEvent = {
      summary: `Booking: Room ${booking.room_id}`,
      description: `Guest: ${booking.user_id}\nStatus: ${booking.status}`,
      start: {
        date: booking.start_date,
        timeZone: "Africa/Johannesburg",
      },
      end: {
        date: booking.end_date,
        timeZone: "Africa/Johannesburg",
      },
    };

    await calendar.events.insert({
      calendarId: "primary",
      requestBody: calendarEvent,
    });

    console.log("Booking added to Google Calendar");
  },
);
