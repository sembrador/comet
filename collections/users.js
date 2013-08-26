Meteor.methods({
	signup: function(userId) {
		Meteor.users.update({
			_id: userId
		}, {
			$addToSet: {
				upvotes: [],
				downvotes: []
		}});
		return userId;
	}
});