Template.signUp.events({
	'submit form': function(e, template) {
	    e.preventDefault();
	    
	    var options = {
	    	username: $(e.target).find('[name=username]').val(),
	    	email: $(e.target).find('[name=email]').val(),
	    	password: $(e.target).find('[name=password]').val()
	    };

	    // if (options.username.length < 3)
	    // 	throw new Meteor.Error 

	    Accounts.createUser(options, function(error) {
			if (error)
				throw new Meteor.Error(422, 'Sign up failed');

		});
	    Meteor.call('signup', Meteor.userId(), function(error, id) {
	    	if (error)
	    		throwError(error.reason);
	    	else {
	    		throwSuccess('Sign up successful');
	    		Meteor.Router.to('/');
	    	}
	    });
	  },

	// 'focus .form-control': function(e, template) {
	// 	e.preventDefault();

	// 	if ($(e.target).find('[name=username]'))
	// 		$('.alert alert-success').val() == 'test';
	// }
});
