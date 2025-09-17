# Project Summary: Flick Fetcher AI

## Overview
Flick Fetcher AI is a modern web application built using React, TypeScript, and Vite. It provides users with a seamless experience for searching and streaming movies. The project leverages various UI components, hooks, and external APIs to deliver a rich and interactive user interface.

## Key Features
- **Movie Search**: Users can search for movies using a responsive search bar.
- **Video Streaming**: Embedded video player powered by VidSrc API for streaming movies.
- **Customizable Playback**: Support for autoplay, subtitle language selection, and external subtitle files.
- **Reusable UI Components**: A library of modular and reusable components such as buttons, dialogs, sliders, and more.
- **Responsive Design**: Ensures compatibility across devices with different screen sizes.

## Technologies Used
- **Frontend**:
  - React: For building the user interface.
  - TypeScript: For type-safe development.
  - Tailwind CSS: For styling and responsive design.
  - Vite: For fast development and build tooling.
- **APIs**:
  - VidSrc API: For embedding movie and TV show streams.
  - TMDB/IMDB: For fetching movie metadata.
- **Utilities**:
  - React Query: For data fetching and caching.
  - React Hook Form: For managing forms and validations.
  - Date-fns: For date manipulation.

## Project Structure
- **src/**: Contains the main application code.
  - **components/**: Houses reusable UI components and feature-specific components like `MovieSearch`.
  - **hooks/**: Custom React hooks for shared logic.
  - **lib/**: Utility functions and helpers.
  - **pages/**: Page-level components for routing.
- **public/**: Static assets like icons and images.

## Notable Files
- `MovieSearch.tsx`: Implements the movie search and video streaming functionality.
- `vite.config.ts`: Configuration for Vite.
- `tailwind.config.ts`: Tailwind CSS configuration.
- `package.json`: Lists project dependencies and scripts.

## How to Run
1. Install dependencies:
   ```
   npm install
   ```
2. Start the development server:
   ```
   npm run dev
   ```
3. Open the app in your browser at the URL provided by the terminal (e.g., http://localhost:5173).

## Future Enhancements
- Add user authentication for personalized experiences.
- Integrate additional streaming sources.
- Implement advanced search filters (e.g., genre, release year).
- Add support for TV shows and episodes.

## Conclusion
Flick Fetcher AI is a robust and scalable application designed for movie enthusiasts. With its modular architecture and modern tech stack, it is well-suited for future enhancements and feature additions.
