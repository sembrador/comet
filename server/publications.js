Meteor.publish('images', function() {
	return Images.find();
});

Meteor.publish('ImagesFS', function() {
	return ImagesFS.find();
});