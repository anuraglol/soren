# Soren

**Soren** is a decentralized event management platform. Users can create and manage events, register as attendees, and send tips to event hosts using embedded wallets — all seamlessly integrated via Civic authentication.

![Soren Preview Image](https://res.cloudinary.com/dzheectoe/image/upload/v1746601358/nrsgwwwopwqdbbrewwfw.png)

## Features

- Civic Auth Integration – Seamless login and wallet creation using Civic
- Event Creation – Authenticated users can create and manage events
- Attendee Registration – Users can register for any public event
- Tipping System – Attendees can tip event hosts using their Civic wallet
- Attendee Dashboard – Hosts can view and manage event participants

## Tech Stack

- Framework: [Next.js](https://nextjs.org/)
- Styling: [Tailwind CSS](https://tailwindcss.com/), [shadcn/ui](https://ui.shadcn.com/)
- Authentication & Wallets: [Civic](https://www.civic.com/)

## Civic Integration

Civic is used for both authentication and embedded wallet functionality. When a user logs in, a wallet is automatically created for them via Civic.

### Event Flow

- User logs in using Civic
- Authenticated user can create an event
- Other users can register to attend
- Attendees can tip the host using their Civic wallet
- Host can view a list of event attendees

### Future Improvements

- RSVP Reminders
- NFT Based Tickets
- Host Verification
- Transaction history for hosts.
