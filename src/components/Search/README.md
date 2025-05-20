# Search Functionality

This search component provides functionality to search and display results from the "search" collection in Payload CMS.

## Features

- Search bar with debounced input for efficient API calls
- Infinite scroll pagination using Intersection Observer
- Responsive grid layout for search results
- Loading states and empty search results handling

## Components

1. **SearchList** (`src/components/Search/List/index.tsx`)

   - Main component for displaying search results with pagination and search functionality
   - Handles search state, debounce, and infinite scrolling

2. **SearchResultCard** (`src/components/Search/SearchResultCard.tsx`)

   - Card component for individual search results
   - Displays title, description, featured image, and categories

3. **Search Action** (`src/components/Search/action.ts`)
   - Server action for fetching search results from the Payload API
   - Handles filtering based on search query

## Usage

The search functionality is implemented on the `/search` page. The page uses server-side rendering to load the initial search results, with client-side pagination and filtering for subsequent requests.

## Implementation Details

- Results are fetched from the 'search' collection in Payload
- The search uses a debounce of 500ms to prevent excessive API calls
- Infinite scrolling is implemented using the Intersection Observer API
- Search queries filter by title and shortDescription fields
- Results are displayed in a responsive grid layout (1, 2, or 3 columns depending on screen size)

## Required Fields

The search component expects the following fields from the search collection:

- `id`: Unique identifier
- `title`: Title of the search result
- `slug`: URL slug for navigation
- `shortDescription`: Brief description of the content
- `featuredImage` or `thumbnailImage`: Image to display in the card
- `categories`: Optional array of categories with title, id, and relationTo properties
