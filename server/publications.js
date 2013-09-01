Meteor.publish('bestImages', function(limit) {
  return Images.find({}, {sort: {votes: -1, submitted: -1}, limit: limit});
});

Meteor.publish('newImages', function(limit) {
  return Images.find({}, {sort: {submitted: -1}, limit: limit});
});


Meteor.publish('currentImage', function(id) {
	return id && Images.find(id);
});

Meteor.publish('comments', function() {
	return Comments.find();
});

// make these extra fields published
Meteor.publish(null, function () {
     return Meteor.users.find({
     	_id: this.userId
     }, {
     	fields: {
     		'upvotes': 1,
     		'downvotes': 1
 	}});
});
