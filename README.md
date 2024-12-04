# Todo App

A **Full-Stack Todo Application** developed using **React.js (frontend)** and **Node.js/Express (backend)** with features like **CRUD operations**, **user authentication and authorization**, and **task filtering based on completion status**.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Setup Instructions](#setup-instructions)
  - [Backend Setup](#backend-setup)
  - [Frontend Setup](#frontend-setup)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Screenshots](#screenshots)
- [License](#license)

---

## Features

- **User Authentication**:
  - Secure user sign-up and login functionality using JWT (JSON Web Tokens).
- **Authorization**:
  - Restricts access to routes and operations for authenticated users only.
- **CRUD Operations**:
  - Create, Read, Update, and Delete tasks.
- **Task Filtering**:
  - Filter tasks based on their completion status (Completed/Incomplete/Important).
- **Responsive UI**:
  - User-friendly interface compatible with all devices.
- **Error Handling**:
  - Proper error messages for invalid inputs and unauthorized actions.

---

## Tech Stack

### Frontend

- React.js (created using `create-react-app`)
- Tailwind CSS for styling
- React Router for navigation
- Redux for state management
- Axios for HTTP requests

### Backend

- Node.js with Express.js
- MongoDB (Database)
- Mongoose (ODM for MongoDB)
- JWT for authentication
- Bcrypt for password hashing

---
# Project Setup Instructions

Follow these steps to set up the **Full-Stack Todo App** on your local machine:

---

## Prerequisites

Make sure you have the following installed on your system:

- **Node.js** (v16+ recommended)  
- **npm** (Node Package Manager) or **yarn**  
- **MongoDB** (local installation or a MongoDB Atlas cluster)  
- **Git** (to clone the repository)

---

## Steps to Set Up the Project

### 1. Clone the Repository

1. Open your terminal.
2. Clone the repository to your local machine:
   ```bash
   git clone https://github.com/your-username/todo-app.git
