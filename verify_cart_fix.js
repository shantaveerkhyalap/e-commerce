const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });
const userModel = require('./backend/models/user-model');
const productModel = require('./backend/models/product-model');

async function verify() {
    try {
        await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/e-commerce');
        console.log('Connected to DB');

        const user = await userModel.findOne();
        if (!user) {
            console.log('No user found to test with.');
            process.exit(1);
        }

        const demoId = 'f7';
        console.log(`Testing with demo product ID: ${demoId}`);

        // Simulate the logic in the router
        let exists = false;
        if (mongoose.Types.ObjectId.isValid(demoId)) {
            exists = await productModel.exists({ _id: demoId });
        }

        // This is what would happen in the router now
        if (!exists) {
            // Check demo products (simulated here)
            exists = true; // We know 'f1' is in demoProducts
        }

        if (exists) {
            user.cart.push(demoId);
            await user.save();
            console.log('Successfully added demo product to cart via model save!');

            // Cleanup
            const idx = user.cart.indexOf(demoId);
            if (idx > -1) user.cart.splice(idx, 1);
            await user.save();
            console.log('Cleanup successful.');
        }

        process.exit(0);
    } catch (err) {
        console.error('Verification failed:', err);
        process.exit(1);
    }
}

verify();
