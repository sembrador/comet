Template.userImages.helpers({
	userImages: function() {
		return Images.find({userId: Meteor.userId()});
	}	
});