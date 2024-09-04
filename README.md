# Applify Attraction

Applify Attraction is a web application designed to help men improve their texting game and enhance their dating skills. Built with Next.js, this app provides a platform for users to practice conversation starters, engage in AI-powered messaging simulations, and receive personalized advice on dating and attraction.

## Features

- User Authentication: Secure registration and login system.
- Dashboard: Personalized user dashboard with multiple features.
- Profile Management: Users can view and edit their profile information.
- Conversation Starters: AI-generated conversation starters for dating scenarios.
- Messaging Practice: An AI-powered chat interface to practice messaging skills.
- Responsive Design: Mobile-friendly interface using Tailwind CSS.

## Technologies Used

- Next.js: React framework for building the frontend and API routes.
- MongoDB: Database for storing user information and messages.
- Mongoose: ODM (Object Data Modeling) library for MongoDB and Node.js.
- Tailwind CSS: Utility-first CSS framework for styling.
- Axios: Promise-based HTTP client for making API requests.
- bcryptjs: Library for hashing passwords.
- jsonwebtoken: Implementation of JSON Web Tokens for authentication.
- OpenAI API: Used for generating conversation starters and AI responses.

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm or yarn
- MongoDB database

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/applify-attraction.git
   cd applify-attraction
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   or
   ```bash
   yarn install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory and add the following:
   ```bash
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret
   OPENAI_API_KEY=your_openai_api_key
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```
   or
   ```bash
   yarn dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

- `/src/pages`: Contains the main pages of the application.
- `/src/components`: Reusable React components.
- `/src/hooks`: Custom React hooks.
- `/src/services`: Services for handling API calls and business logic.
- `/src/utils`: Utility functions and helpers.
- `/src/models`: Mongoose models for database schemas.
- `/src/styles`: Global styles and CSS modules.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.

## Acknowledgments

- OpenAI for providing the AI capabilities.
- Next.js team for the amazing framework.
- All contributors and supporters of the project.
