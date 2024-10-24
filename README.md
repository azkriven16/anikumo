# Anikumo - Anime Search and Discovery Platform

Anikumo is a modern web application built with Next.js that allows users to search for and discover anime. This project showcases a robust full-stack implementation using cutting-edge technologies.

## Tech Stack

-   **Frontend:**

    -   Next.js 14 (App Router)
    -   React
    -   TypeScript
    -   Tailwind CSS
    -   Shadcn UI Components

-   **Backend:**

    -   Next.js API Routes
    -   Prisma ORM
    -   PostgreSQL Database

-   **Authentication:**

    -   NextAuth.js

-   **Development Tools:**
    -   ESLint
    -   Prettier

## Features

-   User authentication (sign up, login, logout)
-   Anime search functionality
-   Responsive design for mobile and desktop
-   Dark mode support

## Getting Started

1. Clone the repository
2. Install dependencies:
    ```bash
    npm install
    ```
3. Set up your environment variables in a `.env` file
4. Run the development server:
    ```bash
    npm run dev
    ```
5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Project Structure

-   `app/`: Contains the main application code (pages, layouts, etc.)
-   `components/`: Reusable React components
-   `db/`: Database queries and models
-   `lib/`: Utility functions and configurations
-   `public/`: Static assets

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is open source and available under the [MIT License](LICENSE).

## TODO List

-   [ ] Implement user profile page
-   [ ] Add anime details page
-   [ ] Create watchlist functionality
-   [ ] Add user likes and comments
-   [ ] Integrate with external anime API for more comprehensive data
-   [ ] Implement recommendation system based on user preferences
-   [ ] Create mobile app version
-   [ ] Add accessibility features
-   [ ] Implement data caching for improved performance
