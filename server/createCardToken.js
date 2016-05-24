var stripe = require('stripe')('sk_test_eKoluhDWiFcfBadmRMlf4I08');

module.exports = function(data) {
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
            require('./planSubscription')(token.id, data.plan, data.email)
        }
    });
}
