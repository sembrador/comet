Meteor.publish('images', function(limit) {
  return Images.find({}, {sort: {submitted: -1}, limit: limit});
});

Meteor.publish('ImagesFS', function() {
	return ImagesFS.find();
});

Meteor.publish('comments', function() {
	return Comments.find();
});

Meteor.publish(null, function () {
     return Meteor.users.find({
     	_id: this.userId
     }, {
     	fields: {
     		'upvotes': 1,
     		'downvotes': 1
 	}});
});
