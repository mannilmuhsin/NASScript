# NASScript

![NASScript Logo](https://nasscript.com/static/media/Nlogo_black_s.7e657e079d58d8b9380094c8b21ca57d.svg)

**NASScript** is a comprehensive web application built using the MERN stack (MongoDB, Express.js, React, and Node.js). It offers advanced NFC card management, domain selection, payment integration using Razorpay, and more. NASScript provides a seamless experience for managing various business needs.

## Features

- **Company Details Form:** Capture essential information about a company.
- **Social Media Integration:** Link to social media accounts with ease.
- **Domain Selection:** Choose and customize domain options.
- **Payment Integration:** Includes online payment options using Razorpay.
- **NFC Card Management:** Manage NFC card orders and durations.
- **Responsive Design:** Optimized for both desktop and mobile platforms.

## Prerequisites

- Node.js (v14 or later)
- MongoDB (local or cloud instance)
- Razorpay account (for payment integration)

## Setup

1. **Clone the repository:**

   ```bash
   git clone https://github.com/mannilmuhsin/NASScript.git
   cd NASScript


2. Install dependencies for both backend and frontend:
   ```
   cd backend && npm install
   cd ../frontend && npm install
   ```

3. Create a `.env` file in the `backend` directory with the following content:
   ```
   MONGODB_URI=your_mongodb_connection_string
   PORT = 8000
   ```

4. Create a `.env` file in the `frontend` directory with the following content:
   ```
   RAZORPAY = your razor pay key
   ```

## Running the Application

1. Start the backend server:
   ```
   cd backend
   npm start
   ```

2. In a new terminal, start the frontend development server:
   ```
   cd frontend
   npm start
   ```

3. Open your browser and navigate to `http://localhost:3000` to use the application.

