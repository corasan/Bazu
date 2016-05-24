var stripe_key = process.env.STRIPE_API_KEY;
var stripe = require('stripe')(stripe_key);

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
