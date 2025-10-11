const mysql = require('mysql2/promise');
require('dotenv').config();

// Create MySQL connection pool
const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '29112023',
  database: process.env.DB_NAME || 'luct_reporting',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Initialize database and tables
async function initializeDatabase() {
  try {
    const connection = await pool.getConnection();
    console.log('✅ Connected to MySQL database');

    // Create database if it doesn't exist
    await connection.execute(`CREATE DATABASE IF NOT EXISTS luct_reporting`);
    await connection.execute(`USE luct_reporting`);

    // Create users table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        full_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        role ENUM('student', 'lecturer', 'program_leader') NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create courses table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS courses (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        code VARCHAR(50) UNIQUE NOT NULL,
        lecturer VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);

    // Create reports table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS reports (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255) NOT NULL,
        description TEXT,
        course_id INT,
        lecturer_id INT,
        student_id INT,
        rating INT,
        status ENUM('submitted', 'reviewed', 'approved') DEFAULT 'submitted',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (course_id) REFERENCES courses(id),
        FOREIGN KEY (lecturer_id) REFERENCES users(id),
        FOREIGN KEY (student_id) REFERENCES users(id)
      )
    `);

    // Create classes table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS classes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        course_id INT,
        schedule VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (course_id) REFERENCES courses(id)
      )
    `);

    // Insert sample data
    await insertSampleData(connection);

    connection.release();
    console.log('✅ Database tables created successfully');
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
  }
}

// Insert sample data
async function insertSampleData(connection) {
  try {
    // Insert sample courses
    await connection.execute(`
      INSERT IGNORE INTO courses (name, code, lecturer) VALUES 
      ('Computer Science', 'CS101', 'Dr. Smith'),
      ('Software Engineering', 'SE201', 'Dr. Johnson'),
      ('Database Systems', 'DB301', 'Dr. Williams')
    `);

    console.log('✅ Sample data inserted successfully');
  } catch (error) {
    console.log('Sample data already exists or error:', error.message);
  }
}

module.exports = { pool, initializeDatabase };