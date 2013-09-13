// Comments for each Image

Comments = new Meteor.Collection('comments');

Meteor.methods({
	comment: function(commentAttributes) {
		var user = Meteor.user();
		var image = Images.findOne(commentAttributes.imageId);

		if (!user)
			throw new Meteor.Error(401, 'You need to login to comment');
		if (!commentAttributes.body)
      		throw new Meteor.Error(422, 'Please write some content');
		if (!commentAttributes.imageId)
			throw new Meteor.Error(422, 'That Image does not exist');
		if (commentAttributes.body >= 140)
			throw new Meteor.Error(422, 'Comments can only be 140 characters');

		comment = _.extend(_.pick(commentAttributes, 'imageId', 'body'), {
			userId: user._id,
			author: user.username,
			submitted: new Date().getTime(),
			votes: 0
		});

		Images.update(comment.imageId, {$inc: {commentsCount: 1}});

		comment._id = Comments.insert(comment);

		return comment._id;
	},

	upvoteComment: function(commentId) {
		var user = Meteor.user();

		if (!user)
			throw new Meteor.Error(422, 'You must be logged in to vote');
		var comment = Comments.findOne(commentId);
		if (!comment)
			throw new Meteor.Error(422, 'Comment not found');
		if (_.include(user.upvotes, comment._id))
			throw new Meteor.Error(422, 'Already upvoted this');
		Comments.update({
			_id: commentId,
		}, {
			$inc: {votes: 1}
		});

		Meteor.users.update({
          _id: user._id, 
          upvotes: {$ne: comment._id}
        }, {
          $addToSet: {upvotes: comment._id},
          $pull: {downvotes: comment._id}
        });
	},

	downvoteComment: function(commentId) {
		var user = Meteor.user();

		if (!user)
			throw new Meteor.Error(422, 'You must be logged in to vote');
		var comment = Comments.findOne(commentId);
		if (!comment)
			throw new Meteor.Error(422, 'Comment not found');
		if (_.include(user.downvotes, comment._id))
			throw new Meteor.Error(422, 'Already upvoted this');
		if (comment.votes == 0)
			throw new Meteor.Error(422, 'Cannot be negative');
		Comments.update({
			_id: commentId,
		}, {
			$inc: {votes: -1}
		});

		Meteor.users.update({
          _id: user._id, 
          downvotes: {$ne: comment._id}
        }, {
          $addToSet: {downvotes: comment._id},
          $pull: {upvotes: comment._id}
        });
	}
});