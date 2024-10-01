Railway Management System API

This is a api based project developed using Node.js, Express and MySQL. In this project the user can register themself and then login using the credentials used while registering. User can afterwards view the trains available between  mentioned stations and book the tickets and can also view their booking history. Admin has the authority to add trains,source,destination and total seats .

Project Setup<br>
1. Clone the Repository ( using git clone)
2. Navigate to the project folder
3. Install dependencies
npm install
4. Set Up the Enviornment Variable by creating .env file in root directory and include the following<br>
PORT=3000<br>
JWT_SECRET=your_jwt_secret_key<br>
ADMIN_API_KEY=your_admin_api_key<br>
DB_HOST=localhost<br>
DB_USER=root<br>
DB_PASSWORD=your_password<br>
DB_NAME=railway_management<br>

5. Set Up the Database <br>
->CREATE DATABASE railway_management;<br>
->USE railway_management;<br>
-> -- Users table<br>
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    email VARCHAR(100) UNIQUE,
    password VARCHAR(255),
    role ENUM('admin', 'user') DEFAULT 'user'
);<br>
-- Trains table<br>
CREATE TABLE trains (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100),
    source VARCHAR(100),
    destination VARCHAR(100),
    total_seats INT,
    available_seats INT
);<br>
-- Bookings table<br>
CREATE TABLE bookings (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    train_id INT,
    seat_no INT,
    booking_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (train_id) REFERENCES trains(id)
);<br>
6. Start the server<br>
node index.js<br>

OUTPUT:
1.User Registration
![Diagram](https://github.com/ShetSahil/railway-management-system/blob/aca35aca9bbd22482776eb3035586d4f76ed8d3e/images/register.png)




