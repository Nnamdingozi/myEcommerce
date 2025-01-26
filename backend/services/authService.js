


const bcrypt = require('bcryptjs');
const { User } = require('../database/models');



const register = async ({ username, email, phone, password, country_code }) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            username,
            email,
            phone,
            password: hashedPassword,
            country_code
        });

        if (!newUser) {
            throw new Error("User creation failed, no user returned from the database.");
        }

        console.log("New user in register service:", newUser);
        return newUser;
    } catch (error) {
        if (error.name === 'SequelizeValidationError') {
            console.error('Validation error:', error.errors);
            throw new Error('Validation error: ' + error.errors.map(e => e.message).join(', '));
        } else {
            console.error('Error during user registration:', error);
            throw new Error('User registration failed.');
        }
    }
};



// Function to find a user by email
const findUserByEmail = async (email) => {
    try {
        return await User.findOne({ where: { email } });
    } catch (error) {
        throw new Error('Error finding user by email: ' + error.message);
    }
};

// Function to compare password with hashed password
const comparePassword = async (password, hashedPassword) => {
    try {
        return await bcrypt.compare(password, hashedPassword);
    } catch (error) {
        throw new Error('Error comparing passwords: ' + error.message);
    }
};

const findOrCreateUser = async (profile, provider) => {
    try {
        const whereClause = { [`${provider}Id`]: profile.id };

        // Step 1: Check if user exists with provider-specific ID
        let user = await User.findOne({ where: whereClause });

        if (!user) {
            // Step 2: Handle missing email
            const email = profile.emails?.[0]?.value || `${profile.username || 'githubUser'}-${profile.id}@placeholder.com`;
            const phoneNumber = '09000000000'
            // Step 3: Create a new user if none exists
            user = await User.create({
                username: profile.displayName || profile.username || 'GitHubUser', // Fallback to 'GitHubUser' if no displayName
                email: email, // Use actual email or placeholder
                phone: phoneNumber,
                password: await bcrypt.hash(Math.random().toString(36).slice(-8), 10), // Generate a random hashed password
                country_code: '+234',
                [`${provider}Id`]: profile.id

            });
        }

        return user;
    } catch (error) {
        throw new Error('Error finding or creating user: ' + error.message);
    }
};



const getUserDetails = (user) => {
    if (!user) {
        throw new Error('User not found')
    }
    return {
        id: user.id,
        username: user.username,
        email: user.email
    }
}

module.exports = {
    register,
    findUserByEmail,
    comparePassword,
    findOrCreateUser, getUserDetails
};
