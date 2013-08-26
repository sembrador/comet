Template.galleryPage.helpers({
	currentImage: function() {
		return Images.findOne(Session.get('currentImageId'));
	},

	comments: function() {
		return Comments.find({imageId: this._id});
	}
});