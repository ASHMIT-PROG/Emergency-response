# Emergency Response System

A real-time emergency response system built for , enabling citizens to instantly notify nearby hospitals and police stations in case of emergencies.

## Features

- Citizen emergency alert system with location sharing
- Responder registration (Hospitals and Police)
- Real-time alert notifications using WebSocket
- Role-based access (Citizens and Responders)
- Location-based emergency tracking with Google Maps integration
- Alert status management

## Tech Stack

- React with TypeScript
- Socket.IO for real-time communication
- Express.js server
- Tailwind CSS for styling
- Browser Geolocation API
- Google Maps JavaScript API

## Getting Started

1. Add your Google Maps API key:
   - Create a `.env` file in the root directory
   - Add your Google Maps API key:
     ```
     VITE_GOOGLE_MAPS_API_KEY=your_api_key_here
     ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open http://localhost:3000 in your browser

## Usage

### As a Citizen
1. Use the citizen view to send emergency alerts
2. Allow location access when prompted
3. Click either "Medical Emergency" or "Police Emergency" button

### As a Responder
1. Switch to responder view
2. Complete the registration form
3. Allow location access
4. View and manage incoming emergency alerts with map previews

## Google Maps Integration

The application uses the Google Maps JavaScript API to display emergency locations. Each alert in the responder dashboard includes an interactive map preview showing the exact location of the emergency.

To set up Google Maps:

1. Get an API key from the [Google Cloud Console](https://console.cloud.google.com/)
2. Enable the Maps JavaScript API for your project
3. Add the API key to your `.env` file as shown above
4. Ensure you have proper billing set up in your Google Cloud account

## Note

This is a hackathon demo that uses in-memory storage instead of a database. All data is temporary and will be lost when the server restarts.
