Template.comment.helpers({
	submittedText: function() {
		return new Date(this.submitted).toString();
	},

	upvoteClass: function() {
		var user = Meteor.user();
		if (user._id && !_.include(user.upvotes, this._id))
			return 'btn-primary upvotable';
		else
			return 'disabled';
	},

	downvoteClass: function() {
		var user = Meteor.user();
		if (user._id && !_.include(user.downvotes, this._id) && this.votes !=0)
			return 'btn-primary downvotable';
		else 
			return 'disabled';
	}
});

Template.comment.events({
	'click .upvotable': function(e) {
		e.preventDefault();
		Meteor.call('upvoteComment', this._id, function(error) {
			if (error)
				throwError(error.reason);
		});
	},

	'click .downvotable': function(e) {
		e.preventDefault();
		Meteor.call('downvoteComment', this._id);
	}
});