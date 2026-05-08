##CRM Lead Management System##

A modern full-stack CRM (Customer Relationship Management) web application built using the MERN stack.
This system allows users to manage leads, track sales opportunities, update lead statuses, manage notes, and monitor dashboard statistics through a clean and user-friendly interface.

#Project Overview

The CRM Lead Management System was developed as a full-stack internship assignment project.

The purpose of this application is to help businesses and sales teams manage customer leads efficiently by providing lead tracking, lead status management, dashboard analytics, filtering, and note management features.

#The application follows a client-server architecture:

-Frontend built using React
-Backend built using Node.js and Express
-MongoDB used as the database

#Tech Stack Used
  *Frontend
    -React.js
    -React Router DOM
    -Axios
    -Inline CSS Styling
  *Backend
    -Node.js
    -Express.js
  *Database
    -MongoDB
    -Mongoose
  *Authentication
    -JWT (JSON Web Tokens)
    -bcryptjs

#Features Implemented
-Authentication
-User login system
-JWT token-based authentication
-Protected dashboard routes
-Lead Management

#Users can:

-Create leads
-View leads
-Edit leads
-Delete leads
-View lead details

#Lead Fields
  Each lead includes:

-Lead Name
-Company Name
-Email
-Phone Number
-Lead Source
-Assigned Salesperson
-Status
-Estimated Deal Value
-Created Date
-Last Updated Date
-Lead Status Management

#Supported lead statuses:

-New
-Contacted
-Qualified
-Proposal Sent
-Won
-Lost

#Dashboard
 Dashboard statistics include:

-Total Leads
-New Leads
-Qualified Leads
-Won Leads
-Lost Leads
-Total Estimated Deal Value
-Total Value of Won Deals
-Search and Filtering

#Users can:

-Search by lead name
-Search by company name
-Search by email
-Filter by lead status
-Filter by lead source
-Filter by assigned salesperson

#Lead Notes
Users can:

-Add notes to leads
-View lead notes

#Each note includes:

-Note Content
-Created By
-Created Date
-UI / UX Improvements
-Modern responsive design
-Professional dashboard layout
-Improved lead management table
-User-friendly forms
-Custom delete confirmation modal
-Better spacing and modern styling

How to Run the Project Locally
1. Clone the Repository
git clone https://github.com/Harsha20020703/crm-lead-management-system
2. Backend Setup
-Navigate to backend folder:
cd backend
-Install dependencies:
npm install
-Create a .env file inside backend folder:
PORT=5000
MONGO_URI=
JWT_SECRET=
-Run backend server:
npm run dev
-Backend server runs on:
http://localhost:5000

3. Frontend Setup
-Navigate to frontend folder:
cd frontend
-Install dependencies:
npm install
-Run frontend:
npm run dev
-Frontend runs on:
http://localhost:5173

#Environment Variables
-Create .env file inside backend folder:
PORT=5000
MONGO_URI=
JWT_SECRET=

#Test Login Credentials
-Use the following credentials to test the application:
Email: admin@gmail.com
Password: admin123

#Database Setup Instructions
This project uses MongoDB Atlas.
Steps:
-Create a MongoDB Atlas account
-Create a cluster
-Create a database user
-Get MongoDB connection string
-Paste the connection string inside .env
-Start backend server

Collections used:
-users
-leads
-leadnotes

API Endpoints
-Authentication
POST /api/auth/login
-Leads
GET /api/leads
POST /api/leads
PUT /api/leads/:id
DELETE /api/leads/:id
-Dashboard
GET /api/dashboard
-Notes
GET /api/notes/:leadId
POST /api/notes/:leadId

#Folder Structure
frontend/
backend/

frontend/src/
components/
pages/
services/

backend/
controllers/
models/
routes/
middleware/

#Known Limitations
-No pagination implemented
-No user registration page
-No role-based authentication
-No email notification system
-No advanced analytics charts
-No deployment configuration yet

#Reflection
This project helped improve my understanding of full-stack web development using the MERN stack.

During development, I improved my skills in:

-REST API development
-React component architecture
-MongoDB database management
-JWT authentication
-CRUD operations
-Frontend and backend integration
-Search and filtering functionality
-Responsive UI design

One of the biggest challenges was integrating filtering, dashboard statistics, and lead management functionalities while maintaining a clean and user-friendly interface.

This project also improved my debugging, API testing, and UI/UX design skills.

Author:

Harsha Deshappriya
BSc (Hons) Computing Undergraduate
NIBM Sri Lanka