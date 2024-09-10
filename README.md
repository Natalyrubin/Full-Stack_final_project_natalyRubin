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

## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/Natalyrubin/Full-Stack_final_project_natalyRubin.git
    cd nodeJs_backendProject
    ```

2. Initialize npm:
    ```sh
    npm init -y
    ```

3. Install dependencies:
    ```sh
    npm install
    npm install bcryptjs
    npm install dotenv
    npm install cors
    ```

4. Install nodemon globally to run the server with automatic restarts:
    ```sh
    npm install -g nodemon
    ```

5. Create a `.env` file in the root directory with the following content:
    ```env
   PORT = 3000
   JWT_SECRET = "your_jwt_secret"
   JWT_EXPIRES_IN = "60m"
   MONGODB_URI_DEV = "mongodb://localhost:27017/convex"
   MONGODB_URI_PROD = "mongodb://localhost:27017/convex_production"
    ```

6. Replace `your_jwt_secret` with your actual JWT secret.

## Running the Application

1. Start the MongoDB server (if it is not already running):
    ```sh
    mongod
    ```

2. Seed the database with initial data:
    ```sh
    node seed.js
    ```

3. Start the Node.js server:
    ```sh
    nodemon
    ```

   This will start the server in development mode using `nodemon`. The server will listen for requests on `http://127.0.0.1:3000`.


 4. To navigate the project and enable routing functionality, download the node_modules folder and install React Router DOM by running the following command:
    ```bash
    npm install
    npm run dev
    ```


### Note
Ensure proper navigation by running the application through the terminal and accessing it via the browser.

Enjoy! 🙂
