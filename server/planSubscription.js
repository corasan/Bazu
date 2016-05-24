var stripe = require('stripe')('sk_test_eKoluhDWiFcfBadmRMlf4I08');
// process.env.STRIPE_TEST_KEY
module.exports = function(token, plan) {
    stripe.customers.create({
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
