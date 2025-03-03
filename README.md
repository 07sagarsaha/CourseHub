# CourseHub - Online Learning Platform

CourseHub is a React-based online learning platform that enables users to browse, enroll, and track courses with real-time updates. The application integrates Firebase for authentication, database management, and storage.

## Live Demo

Experience the live website here: [CourseHub](https://coursehub-sagar.netlify.app/)

## Features

- **Course listing**: Browse and search for available courses.
- **Course details page**: Access comprehensive course information.
- **User Authentication**: Register/Login using Firebase Authentication.
- **Enrollment System**: Enroll in courses with a single click.
- **Student Dashboard**: Track progress and manage enrolled courses.
- **Real-time Updates**:
  - Instant course likes updates across all users.
  - Real-time enrollment status.
  - Synchronized course progress across devices.

## Tech Stack

- **Frontend**: React.js with React Router
- **State Management**: Redux Toolkit
- **Backend & Database**: Firebase (Authentication, Firestore, Storage)
- **Styling**: Tailwind CSS
- **Icons**: Lucide React

## Installation and Setup

### Prerequisites

Ensure you have the following installed:

- Node.js (v14 or higher)
- npm or yarn
- Firebase account with Firestore enabled

### Setup Instructions

1. Clone the repository:
   ```sh
   git clone https://github.com/07sagarsaha/CourseHub
   cd coursehub
   ```
2. Create a `.env` file in the root directory and add Firebase configuration:
   ```sh
   VITE_FIREBASE_API_KEY="YOUR_API_KEY"
   VITE_FIREBASE_AUTH_DOMAIN="YOUR_AUTH_DOMAIN"
   VITE_FIREBASE_PROJECT_ID="YOUR_PROJECT_ID"
   VITE_FIREBASE_STORAGE_BUCKET="YOUR_STORAGE_BUCKET"
   VITE_FIREBASE_MESSAGING_SENDER_ID="YOUR_MESSAGING_SENDER_ID"
   VITE_FIREBASE_APP_ID="YOUR_APP_ID"
   VITE_FIREBASE_MEASUREMENT_ID="YOUR_MEASUREMENT_ID"
   ```
3. Install dependencies:
   ```sh
   npm install
   ```
4. Start the development server:
   ```sh
   npm run dev
   ```
5. Open the browser and visit `http://localhost:5173`.

## Authentication Guide

- **Register** a new account from the navigation bar.
- **Automatic login** after registration.
- **Logout** using the navigation bar button.
- **Re-login** anytime via the login page.

## Course Enrollment Process

1. Browse available courses.
2. Click a course to view details.
3. Enroll using the **"Enroll Now"** button.
4. Access enrolled courses from the student dashboard.
