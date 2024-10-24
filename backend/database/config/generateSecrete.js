const fs = require('fs');
const crypto = require('crypto');

const secret = crypto.randomBytes(32).toString('hex');
fs.appendFileSync('.env', `SESSION_SECRET=${secret}\n`);
console.log('Secret Key added to .env file');

const secretKey = 'your_secret_key_here'; // Replace with your actual secret
const envFilePath = '.env';

// Read the current .env file
fs.readFile(envFilePath, 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading .env file:', err);
        return;
    }

    // Check if the key already exists
    if (data.includes('SESSION_SECRET')) {
        console.log('SESSION_SECRET already exists. Updating the value...');
        // Replace the existing value
        const updatedData = data.replace(/SESSION_SECRET=.*/, `SESSION_SECRET=${secretKey}`);
        fs.writeFile(envFilePath, updatedData, (err) => {
            if (err) {
                console.error('Error writing to .env file:', err);
            } else {
                console.log('SESSION_SECRET updated successfully.');
            }
        });
    } else {
        // If it doesn't exist, append it
        fs.appendFile(envFilePath, `SESSION_SECRET=${secretKey}\n`, (err) => {
            if (err) {
                console.error('Error appending to .env file:', err);
            } else {
                console.log('SESSION_SECRET added successfully.');
            }
        });
    }
});
