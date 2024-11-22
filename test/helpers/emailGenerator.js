const emailGenerator = {
    // Generates a random email with a customizable length and multiple domain options
    generateRandomEmail: (length = 6, domains = ['example.com', 'gmail.com', 'yahoo.com']) => {
        const chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; // Allowed characters
        let firstName = '';
        let randomEmail = '';

        // Generate a random string for the first part of the email
        for (let i = 0; i < length; i++) {
            firstName += chars.charAt(Math.floor(Math.random() * chars.length));
        }

        // Choose a random domain from the available list
        const domain = domains[Math.floor(Math.random() * domains.length)];

        // Construct the full email
        randomEmail = `${firstName}@${domain}`;

        return randomEmail;
    }
};

export default emailGenerator;