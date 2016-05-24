var stripe = require('stripe')(process.env.STRIPE_KEY);
// process.env.STRIPE_TEST_KEY
module.exports = function(token, plan, email) {
    stripe.customers.create({
        email: email,
        source: token,
        plan: plan
    }, function(err, customer) {
        if (err) {
            console.log('An error occurred trying to subscribe to this plan:', err);
        } else {
            console.log('Subscription successful', customer);
        }
    });
}
