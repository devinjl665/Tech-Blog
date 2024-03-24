// Import sequelize for database connection and required models
const sequelize = require('../config/connection');
const { User, Blog, Comment } = require('../models');

// Import data from JSON files
const userData = require('./userData.json');
const blogData = require('./blogData.json');
const commentData = require('./commentData.json');

// Define the function to seed the database
const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    // Create users with individual hooks enabled for password hashing
    const users = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    // Loop through blog data to create blogs associated with random users
    for (const blog of blogData) {
        await Blog.create({
            ...blog,
            user_id: users[Math.floor(Math.random() * users.length)].id,
        });
    }

    // Fetch all blogs from the database
    const blogs = await Blog.findAll();

    // Loop through comment data to create comments associated with random users and blogs
    for (const comment of commentData) {
        await Comment.create({
            ...comment,
            user_id: users[Math.floor(Math.random() * users.length)].id,
            blog_id: blogs[Math.floor(Math.random() * blogs.length)].id,
        });
    }

    // Exit the process after seeding the database
    process.exit(0);
};

// Execute the seedDatabase function
seedDatabase();