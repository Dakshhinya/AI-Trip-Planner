# Product Requirements Document (PRD): AI-Trip-Planner (RoamRight)

## 1. Project Overview
**Name:** RoamRight (AI-Trip-Planner)
**Description:** A React-based web application that generates personalized, comprehensive travel itineraries using AI. Users can input their desired destination, travel duration, budget level, and the type of travel companions to receive a highly tailored travel plan. The generated plan includes curated hotel recommendations and day-by-day itineraries with places to visit, ticket pricing, and timings.

## 2. Tech Stack and Architecture

### Frontend
*   **Framework:** React 18 powered by Vite (`vitejs/plugin-react`).
*   **Routing:** React Router DOM (v6) for client-side routing.
*   **Styling:** Tailwind CSS (`tailwindcss`, `autoprefixer`), extended with utilities like `class-variance-authority`, `clsx`, and `tailwind-merge` (indicative of a shadcn/ui or similar custom component architecture).
*   **Animations:** `tailwindcss-animate`.

### UI/UX Components
*   **Component Primitives:** Radix UI (`@radix-ui/react-dialog`, `@radix-ui/react-popover`, `@radix-ui/react-slot`) for accessible interactive elements.
*   **Icons:** `lucide-react` and `react-icons`.
*   **Notifications:** `sonner` for toast notifications.

### Authentication & Database
*   **Authentication:** Google OAuth integrated via `@react-oauth/google`. User details (like email and Google token info) are fetched using Google's OAuth2 API.
*   **Database:** Firebase Firestore (`firebase`). Application state and generated trips are saved to the cloud under the `AITrips` collection.

### AI & External APIs
*   **AI Engine:** Google Generative AI (`@google/generative-ai`), specifically utilizing the `gemini-1.5-flash` model for generating structured itinerary data in JSON format.
*   **Location Services:** Google Places API integrated via `react-google-places-autocomplete` to provide intelligent destination search.

## 3. Core Features & User Flow

### 3.1. Landing & Trip Creation (`/src/create-trip`)
The user lands on the trip creation page to enter their travel preferences:
1.  **Destination Search:** Autocomplete location input utilizing Google Places API.
2.  **Duration Input:** Numeric input for the number of travel days.
3.  **Budget Selection:** Three preset options: "Cheap", "Moderate", "Luxury".
4.  **Companion Selection:** Four preset options: "Just Me" (1 person), "A Couple", "Family", "Friends" (more than 5).
5.  **Authentication Guard:** Upon clicking "Generate Trip", if the user is not authenticated, a Google Sign-In dialog opens. A valid Google session is required to proceed.

### 3.2. AI Prompt Generation & Trip Saving (`AIModal.jsx` & Service Layer)
*   **Prompt Construction:** The application injects user preferences into a predefined prompt (`AI_PROMPT`).
*   **Generative AI Calling:** The system queries Gemini with constraints to return a specific `application/json` format encompassing:
    *   `hotelOptions`: Array of hotels (Name, Address, Price, Image URL, Geo-Coordinates, Rating, Description).
    *   `itinerary`: Array of daily plans mapping activities (Place Name, Details, Image URL, Geo-Coordinates, Ticket Pricing, Rating, Timings).
*   **Firebase Storage:** Upon successful parsing, the JSON response and the user's initial selections are saved into a new document in Firestore with a unique timestamp-based `docId`.

### 3.3. View Trip Details (`/src/view-trip/[tripId]`)
After generation, the user is navigated or linked to their dedicated trip dashboard.
1.  **Trip Retrieval:** Fetches the saved document from Firestore using the `tripId` param.
2.  **Info Section:** A banner summarizing the destination, duration, budget, and companion type.
3.  **Hotel Recommendations:** A grid view of suggested hotels with details (price, rating, and description) parsed from the generative AI response.
4.  **Day-by-Day Itinerary:** A chronologically mapped list of daily activities, suggesting specific times to visit, ticket pricing strategies, and summarized descriptions.

## 4. Key Configuration & Environment Variables
The application relies on several environment variables (`.env`) injected via Vite (`import.meta.env`):
*   `VITE_GOOGLE_GEMINI_AI_API_KEY`: API key for Gemini.
*   `VITE_GOOGLE_PLACE_API_KEY`: API key for Google Places autocomplete.
*   `VITE_GOOGLE_MAPS_API_KEY`: API key for Maps/Geocoding services.
**(Note: Ensure these keys are restricted correctly in Google Cloud Console for security).**

## 5. Potential Future Enhancements
*   Add Maps embed or static map images utilizing the generated geo-coordinates.
*   Fetch live images using Google Places Photos API instead of relying on AI-hallucinated image URLs.
*   Introduce dynamic multi-city itineraries.
*   Allow users to edit or regenerate specific days in the itinerary.
