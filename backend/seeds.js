const pool = require('./database');
const bcrypt = require('bcryptjs');

async function seed() {
  try {
    // Clear tables
    await pool.query('DELETE FROM ratings; DELETE FROM attendances; DELETE FROM reports; DELETE FROM classes; DELETE FROM courses; DELETE FROM users;');

    // Users (hashed passwords)
    const hashedPass = await bcrypt.hash('password123', 10);
    await pool.query(`
      INSERT INTO users (username, password, role, stream) VALUES
      ('student1', '${hashedPass}', 'student', 'IT'),
      ('lecturer1', '${hashedPass}', 'lecturer', 'CS'),
      ('prl1', '${hashedPass}', 'prl', 'SE'),
      ('pl1', '${hashedPass}', 'pl', NULL);
    `);

    // Courses
    await pool.query(`
      INSERT INTO courses (name, code, stream, assigned_lecturer_id) VALUES
      ('Web Development', 'DIWA2110', 'IT', 2),
      ('Database Systems', 'DBS101', 'CS', 2),
      ('Software Engineering', 'SE201', 'SE', 2);
    `);

    // Classes
    await pool.query(`
      INSERT INTO classes (name, course_id, venue, scheduled_time, total_registered_students) VALUES
      ('Diploma IT Class', 1, 'Room 101', '09:00:00', 30);
    `);

    console.log('Seeded successfully');
  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
}

seed();