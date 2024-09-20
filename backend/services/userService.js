
const  { User }   = require('../database/models');


const getAllUsers = async () => {
    const users = await User.findAll();
    if (users) {
        return users;
    }
    throw new Error('Invalid operation')

};

// get a user by id

const getUserById = async (id) => {
    const user = await User.findByPk(id);
    if (user) {
        return user;
    }
    throw new Error('user not found')
};
// get user by email
const getUserByEmail = async (email) => {
    const user = await User.findOne({where:{ email} });
    if (user) {
        return user;
    }
    throw new Error('user not found')
}

//update a user

const updateUser = async (userId, userData) => {
    const [updated] = await User.update(userData, {
        where: {id: userId}
    });
    if(updated) {
        return await User.findByPk(userId)
    }
    throw new Error('user not found')
};
//delete a user
const deleteUser = async (userId) => {
    const deleted = await User.destroy({
        where: {id: userId}
    });
    if(deleted) {
        return true;
    }
    throw new Error('User not found');
};
module.exports = {
    getAllUsers,
    getUserById,
    getUserByEmail,
    updateUser,
    deleteUser
}