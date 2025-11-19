EdTech Task Manager – Full Stack MERN Application

A full-stack role-based Task Manager built for the EdTech Learning Campus assignment by DIGIT IT.  
This application supports Teacher–Student workflows, task creation, progress tracking, and secure authentication.


=> Live Demo  
*Frontend (Vercel)*:  
https://edtech-orpin.vercel.app/

*Backend (Render)*:  
https://edtech-backend-0q1u.onrender.com/


=> Project Features

=> Teacher Features
- Create tasks  
- View all student tasks  
- See student labels (“by student-email”)  
- Update task progress  
- Delete own tasks  
- Role-based dashboard  

=> Student Features
- Signup under a teacher  
- Create personal tasks  
- See only own tasks  
- Update/delete own tasks  
- Permission-restricted actions  


=> Authentication & Authorization
- JWT authentication  
- Password hashing using bcrypt  
- Protected routes  
- Student/Teacher access control  

=> Tech Stack

=> Frontend  
- React  
- React Router  
- TailwindCSS  
- Axios  

=> Backend  
- Node.js  
- Express.js  
- MongoDB + Mongoose  
- JWT  

=> Deployment  
- Vercel → Frontend  
- Render → Backend  
- MongoDB Atlas → Database  

=> Project Structure

Edtech_fsd/
│
├── client/
│   ├── src/
│   │   ├── pages/
│   │   ├── components/
│   │   ├── services/
│   │   └── App.js
│   ├── public/
│   └── package.json
│
├── server/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── server.js
│   └── package.json
│
└── README.md


=> Local Setup Instructions

=> Backend Setup

cd server
npm install

Create '.env' inside server folder:
PORT=5000
MONGO_URI=your_mongo_uri_here
JWT_SECRET=your_secret_key_here

Run backend:
npm start


=> Frontend Setup

cd client
npm install
npm start


=> Deployment Info

=> Frontend (Vercel)
- Auto-deployed from GitHub  
- React Router works automatically  
- API URL is configured in `client/src/services/api.js`:

baseURL: "https://edtech-backend-0q1u.onrender.com"


=> Backend (Render)
- Node.js Web Service  
- Build command: npm install  
- Start command: node server.js  
- Environment variables added via dashboard  


=> API Endpoints

=> Auth
- POST /auth/signup  
- POST /auth/login  

=> Tasks
- GET /tasks  
- POST /tasks  
- PUT /tasks/:id  
- DELETE /tasks/:id  

=> Teachers
- GET /teachers  


=> Demonstration Video
The project demo covers:  
- Teacher and Student signup  
- Login and role verification  
- Task creation, editing, deletion  
- Progress updates  
- Teacher viewing student tasks  
- Full deployed flow  
- Backend + database validation  


=> Done by:
Y.Isaac Pranit Kumar 
EdTech Task Manager – DIGIT IT Assignment Submission  
