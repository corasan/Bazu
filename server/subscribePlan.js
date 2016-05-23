var subscribe = {
    subscribePlan: function(token, plan, email) {
        stripe.customers.create({
            source: token,
            plan: plan,
            email: email
        }, function(err, customer) {
            if (err) {
                console.log('An error occurred trying to subscribe to this plan:', err);
            } else {
                console.log('Subscription successful', customer);
            }
        });
    }
}
