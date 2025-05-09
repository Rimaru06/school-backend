const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./models/User');

const createAdmin = async () => {
  try {
    await mongoose.connect("mongodb+srv://shiva2301be22:FDTcXqDA815B1sz5@cluster0.gnd1icc.mongodb.net/schoolDB");

    const existingAdmin = await User.findOne({ email: 'admin@school.com' });
    if (existingAdmin) {
      console.log('Admin already exists.');
      return process.exit();
    }

    const hashedPassword = await bcrypt.hash('admin123', 10);

    const admin = new User({
      name: 'Admin',
      email: 'admin@school.com',
      password: hashedPassword,
      role: 'admin'
    });

    await admin.save();
    console.log('✅ Admin user created successfully');
    process.exit();
  } catch (err) {
    console.error('❌ Error creating admin:', err);
    process.exit(1);
  }
};

createAdmin();