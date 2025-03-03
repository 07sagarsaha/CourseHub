# CourseHub - Online Learning Platform

A React-based course management application with Firebase integration for real-time updates, authentication, and data storage.

## Features

- Browse and search available courses
- View detailed course information
- User authentication (register/login)
- Enroll in courses
- Track course progress in student dashboard
- Real-time updates for course likes and enrollment status

## Tech Stack

- React.js with React Router
- Redux Toolkit for state management
- Firebase (Authentication, Firestore, Storage)
- Tailwind CSS for styling
- Lucide React for icons

## Running the Application

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- A Firebase account with Firestore enabled

### Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```
   npm install
   ```
3. Start the development server:
   ```
   npm run dev
   ```
4. Open your browser and navigate to the URL shown in the terminal (typically http://localhost:5173)

### First-time Setup

When you first run the application, you'll need to seed the database with sample courses:

1. Navigate to the homepage
2. If no courses are displayed, click the "Seed Sample Courses" button
3. Wait for the confirmation message that courses have been added
4. The courses should appear automatically due to real-time listeners

### Authentication

- You can register a new account using the "Register" button in the navigation bar
- After registering, you'll be automatically logged in
- You can log out using the "Logout" button in the navigation bar
- To log back in, use the "Login" button and enter your credentials

### Course Enrollment

1. Browse courses on the homepage
2. Click on a course to view its details
3. Click the "Enroll Now" button to enroll in a course
4. View your enrolled courses in the dashboard

### Real-time Updates

The application uses Firebase's real-time listeners to provide instant updates:

- Course likes update in real-time across all clients
- Enrollment status changes are reflected immediately
- Course progress updates are synchronized across devices

## Project Structure

- `/src/components` - Reusable UI components such as CourseCard, CourseList, EnrolledCourseCard, Loader, Navbar, and ProtectedRoute. These components are used to build the user interface of the application.
- `/src/pages` - Page components for different routes such as HomePage, CourseDetailsPage, DashboardPage, LoginPage, NotFoundPage, and RegisterPage. These components represent the different pages of the application.
- `/src/redux` - Redux store, slices, and actions for managing the application's state. Includes the store configuration and slices for authentication and courses.
- `/src/firebase` - Firebase configuration and utilities for connecting to Firebase services such as Authentication, Firestore, and Storage.
- `/src/utils` - Helper functions and utilities such as seedData for seeding the database with sample courses.
- `/src/hooks` - Custom React hooks such as useCourseLikes for handling course likes.
