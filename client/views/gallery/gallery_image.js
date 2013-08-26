Template.galleryImage.helpers({
	upvotedClass: function() {
		var user = Meteor.user();
		if (user._id && !_.include(user.upvotes, this._id))
			return 'btn-primary upvotable';
		else
			return 'disabled';
	},

	downvoteClass: function() {
		var user = Meteor.user();
		if (user._id && !_.include(user.downvotes, this._id) && this.votes != 0)
			return 'btn-primary downvotable';
		else 
			return 'disabled';
	}
});

Template.galleryImage.events({
	'click .upvotable': function(e) {
		e.preventDefault();
		Meteor.call('upvote', this._id);
	},

	'click .downvotable': function(e) {
		e.preventDefault();
		Meteor.call('downvote', this._id);
	}
});