


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

// Function to find or create a user based on social profile
const findOrCreateUser = async (profile, provider) => {
    try {
        const whereClause = { [`${provider}Id`]: profile.id };

        let user = await User.findOne({ where: whereClause });

        if (!user) {
            user = await User.create({
                username: profile.displayName,
                email: profile.emails[0].value,
                [`${provider}Id`]: profile.id
            });
        }

        return user;
    } catch (error) {
        throw new Error('Error finding or creating user: ' + error.message);
    }
};

const getUserDetails =(user) => {
    if(!user) {
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
