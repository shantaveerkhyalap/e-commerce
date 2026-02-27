try {
    console.log('Attempting to require index routes...');
    const index = require('./backend/routes/index.js');
    console.log('Successfully required index routes.');
} catch (err) {
    console.error('Error requiring index routes:', err);
}
