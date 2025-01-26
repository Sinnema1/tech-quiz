# Tech Quiz Application

## Description

The Tech Quiz Application is a full-stack web application that allows users to test their knowledge on various tech topics through an interactive quiz. This project demonstrates the use of a React frontend, a Node.js/Express backend, and a MongoDB database. It features dynamic question loading, score tracking, and quiz restarting.

![image](https://github.com/user-attachments/assets/60f1c33f-da7a-488b-83d6-c18af8ac61e6)

## Technologies Used

### Frontend
- React
- Bootstrap

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose

### Testing
- Cypress (Component and End-to-End Testing)

## Table of Contents

- [Description](#description)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Testing](#testing)
- [License](#license)
- [Contributing](#contributing)
- [Questions](#questions)

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Sinnema1/tech-quiz.git
   ```
2. Navigate to the project directory:
   ```bash
   cd Develop
   ```
3. Install dependencies for both the client and server:
   ```bash
   npm install
   ```
4. Set up environment variables:
   - Create a .env file in the server directory.
   - Add the following variables:
   ```env
   MONGODB_URI=<your_mongodb_connection_string>
   ```
5. Build the server:
   ```bash
   npm run build
   ```
6. Build the client:
   ```bash
   npm run client:build
   ```
7. Seed the database (optional):
   ```bash
   npm run seed
   ```

## Usage

1. Start the application:
   ```bash
   npm run start:dev
   ```
2.	Open your browser and navigate to the deployed site or http://127.0.0.1:3001.

## Features

•	Dynamic Quiz Generation: Randomly fetches tech-related questions for each quiz session.
•	Score Tracking: Displays the user’s score upon quiz completion.
•	Restartable Quizzes: Allows users to start a new quiz session after completing the current one.
•	Responsive Design: Mobile-friendly layout with Bootstrap styling.

## Testing

### Cypress Testing

The application includes comprehensive Cypress tests for both component and end-to-end scenarios:

1. **Component Tests**:
   - Located in `cypress/component/Quiz.cy.tsx`.
   - Tests individual components like `<Quiz />`.

2. **End-to-End Tests**:
   - Located in `cypress/e2e/quiz.cy.ts`.
   - Covers full user interactions, such as starting the quiz, answering questions, and restarting the quiz.

3. Run the tests:
   ```bash
   npm run cypress
   ```
4.	Open the Cypress testing interface and choose the desired tests to run.

## License

This project is licensed under the MIT License.  

## Contributing

1. Fork the repository.  
2. Create a new branch:
   ```bash
   git checkout -b feature/YourFeature
   ```
4. Commit your changes:
   ```bash
   git commit -m 'Add some feature'
   ```
6. Push to the branch:
   ```bash
   git push origin feature/YourFeature
   ```
8. Open a pull request.

## Questions

- **GitHub**: [Sinnema](https://github.com/Sinnema1/tech-quiz/)
- **Recording**: [Link](https://drive.google.com/file/d/1imYtJ83P203AEIeg8SPe0SwMfSwFwS7z/view?usp=share_link)
- **Email**: test@test.com
