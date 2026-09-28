# PRODIGY_FS_02 — Employee Management System
 
Task 02 of the Prodigy Infotech Full-Stack Web Development Internship (Track Code: FS).
 
A full-stack CRUD web application that allows an authenticated administrator to
create, read, update and delete employee records, with both frontend and
backend validation and JWT-based authentication.
 
## Tech Stack
- Frontend: React (Vite), React Router, Axios
- Backend: Node.js, Express, JWT, bcryptjs, express-validator
- Database: MongoDB (Atlas)
 
## How to run locally
1. cd backend && npm install && npm run dev
2. cd frontend && npm install && npm run dev
3. Open http://localhost:5173
 
## Features
- Admin login with hashed passwords and JWT sessions
- Protected routes: employee data only reachable when logged in
- Full CRUD on employee records
- Client-side and server-side validation
