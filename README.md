# VoteChain

VoteChain is a modern, full-stack voting application that allows users to create polls, cast their votes, and see the results in real-time.

## Features
- **Create Polls:** Users can easily create new polls with multiple options.
- **Real-time Voting:** Cast your vote and instantly see the updated results.
- **Modern UI:** A sleek, responsive, and intuitive user interface built with React and Tailwind CSS.
- **Robust Backend:** A reliable Spring Boot REST API for managing polls and votes.

## Tech Stack

### Frontend
- **React 19** - UI Library
- **Vite** - Build Tool
- **Tailwind CSS 4** - Styling

### Backend
- **Spring Boot 3** - Framework
- **Spring Data JPA** - Data Access
- **H2 Database** - In-memory Database

## Getting Started

### Prerequisites
- Node.js (v18 or higher)
- Java 17
- Maven

### Running the Backend
1. Navigate to the backend directory:
   ```bash
   cd votingapp
   ```
2. Run the Spring Boot application:
   ```bash
   ./mvnw spring-boot:run
   ```
   *(The backend runs on `http://localhost:8080` by default. The H2 console is available at `http://localhost:8080/h2-console`)*

### Running the Frontend
1. Navigate to the frontend directory:
   ```bash
   cd react-frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
   *(The frontend will typically run on `http://localhost:5173`)*

## License
This project is licensed under the MIT License.
