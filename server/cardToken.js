var stripe_key = process.env.STRIPE_API_KEY;
var stripe = require('stripe')(stripe_key);

module.exports = function(data) {
    console.log(stripe_key);
    stripe.tokens.create({
        card: {
            number: data.number,
            exp_month: data.exp_month,
            exp_year: data.exp_year,
            cvc: data.cvc
        }
    }, function(err, token) {
        if(err) {
            console.log(err);
        } else {
            require('./customer')(token.id, data.plan, data.email)
        }
    });
}
