# E-commerce Surfboards Website

## Description
This is a full-stack e-commerce application for selling surfboards, built with HTML, CSS, React, TypeScript, Node.js, Express, MongoDB, Morgan, and CORS. Users can browse and purchase surfboards, add items to their cart, and manage personal details. The application supports two user roles: regular user and admin. Regular users can view and edit their profile information and access their cart, while admin users can also manage the product inventory (add, edit, and delete items). The application supports both dark and light modes for a better user experience.

## Features

### User Features
- **Product Catalog**: Browse surfboards with options to filter by category or search by model name.
- **Add to Cart**: Add items to your personal cart by clicking the "+" icon on the product cards or from the product details page.
- **User Authentication**: Users can sign up, log in, and log out. After logging in, users have access to personalized features.
- **Profile Management**: Logged-in users can access their personal information by clicking on the user icon and navigating to the edit profile page.
- **Cart Access**: Logged-in users have a "My Cart" section in the header to view and manage their cart.
- **Dark Mode/Light Mode**: Users can switch between dark and light mode according to their preference.

### Admin Features
- **Inventory Management**: Admin users have access to a dedicated inventory management section, where they can:
  - Add new surfboards
  - Edit existing surfboard details
  - Delete surfboards from the catalog
- **Restricted Access**: Only admin users can access the inventory management features.

## Technical Stack
- **Frontend**: HTML, CSS, React, TypeScript
- **Backend**: Node.js, Express.js, MongoDB, JWT for authentication, CORS for cross-origin resource sharing
- **Additional Libraries**: Morgan (HTTP request logger), bcrypt (for password hashing)

## Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/your-username/surfboards-ecommerce.git
cd surfboards-ecommerce
```


### 2. Install Dependencies
Install backend and frontend dependencies:

Backend (Node.js):
bash
Copy code
cd backend
npm install
Frontend (React):
bash
Copy code
cd frontend
npm install


### 3. Environment Variables
Create a .env file in the backend root directory and add the following environment variables:

env
Copy code
PORT=3000
JWT_SECRET="iLoveSurfing123!@#"
JWT_EXPIRES_IN="60m"
MONGODB_URI_DEV="mongodb://localhost:27017/convex"
MONGODB_URI_PROD="mongodb://localhost:27017/convex_production"


### 4. Running the Application
Backend (Express Server):
To start the Node.js backend server:

bash
Copy code
cd backend
npm run dev
The server will run at: http://127.0.0.1:3000

Frontend (React App):
To start the React frontend:

bash
Copy code
cd frontend
npm start
The React app will be running at: http://localhost:3000

### 5. MongoDB Setup
Make sure MongoDB is running locally or connect to a cloud MongoDB instance. Use the following connection strings:

Development: mongodb://localhost:27017/convex
Production: mongodb://localhost:27017/convex_production


