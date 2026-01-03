import * as functions from "firebase-functions";
import {google} from "googleapis";
import * as admin from "firebase-admin";

admin.initializeApp();

const calendar = google.calendar("v3");
const auth = new google.auth.GoogleAuth({
  keyFile: "service-account.json",
  scopes: ["https://www.googleapis.com/auth/calendar"],
});

export const addBookingToCalendar = functions.firestore
  .document("bookings/{bookingId}")
  .onCreate(async (snap) => {
    const booking = snap.data();

    const authClient = await auth.getClient();

    const event = {
      summary: `Booking: Room ${booking.room_id}`,
      description: `Guest: ${booking.user_id}\nStatus: ${booking.status}`,
      start: {
        date: booking.start_date, // e.g. "2025-10-01"
        timeZone: "Africa/Johannesburg",
      },
      end: {
        date: booking.end_date,
        timeZone: "Africa/Johannesburg",
      },
    };

    await calendar.events.insert({
      auth: authClient,
      calendarId: "primary", // replace with your Guesthouse Calendar ID
      requestBody: event,
    });

    console.log("Booking added to Google Calendar");
  });
