# Natural Events from EONET

A React application for exploring natural events from NASA's Earth Observing System Data and Information System (EONET) API.

## Setup and Installation Instructions

### Prerequisites

- Node.js (latest LTS version recommended)
- pnpm (preferred package manager for its disk space efficiency, faster installations, stricter dependency management, and cleaner terminal output)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
pnpm install
```

### Development

```bash
pnpm dev
```

## Brief Description of Approach and Design Decisions

### Architecture

- **Component-based architecture** with a clear separation between features, components, and hooks
- **Custom hooks pattern** for state management (`useEvents`, `useFilters`, `usePagination`)
- **Context API** for sharing event data across components without prop drilling
- **Feature-based folder structure** organizing related components together

### Key Design Decisions

- **Vite** for ultra-fast development server without complex configuration
- **TypeScript** for type safety and better developer experience
- **TanStack React Query** for efficient data fetching, caching, and synchronization with the EONET API
- **Material-UI (MUI)** for consistent, accessible UI components and theming
- **Luxon** for date/time handling and formatting
- **React Leaflet** integration for interactive map visualization of event locations

### Data Flow

1. Filters generate API URLs dynamically
2. React Query handles caching and fetching
3. Events are displayed in the table
4. Modal for showing map details of an event

## Technologies Overview

### Previously Familiar Technologies

- **Vite** - Standard build tool I use regularly
- **React** - Primary framework I work with
- **TypeScript** - Always use because types are amazing
- **ESLint/Prettier** - Helps me keep my sanity
- **Luxon** - Very user-friendly, well-documented library for DateTime management

### New/Less Familiar Technologies

- **Material-UI** - It has been years since I last used this library
- **TanStack React Query** - I have looked at this before but never actually used it
- **React Leaflet** - Newly discovered for this implementation, but very easy to use
- **EONET API** - Brand new API that I hadn't worked with before
- **Husky** - I have used this previously on a project, but don't know all the intricacies

## Assumptions Made

1. **API Stability** - Assumed EONET API structure remains consistent
2. **Browser Support** - Targeting modern browsers with ES6+ support
3. **Data Volume** - Since the API does not provide pagination, I set a default 30-day limit and provide warnings/cancellation options if users attempt to search for longer periods
4. **User Interaction** - Assumed users primarily interact via desktop/tablet interfaces

## What Would Be Added/Removed/Changed With More Time

### Additions

- **Enhanced map view** - A large map interface showing all events simultaneously with toggleable category visibility for visual data exploration
- **Details page** - Dedicated page for each event with comprehensive information, related events, and enhanced geographic context

### Changes

- **Mobile-optimized interface**
    - Replace the table with a card-based layout showing essential details, with infinite scroll loading. Ideally paired with an API that supports proper pagination for better performance
    - Update the filter menu to use a collapsible dropdown for mobile devices
