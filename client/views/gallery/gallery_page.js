Template.galleryPage.helpers({
	currentImage: function() {
		return Images.findOne(Session.get('currentImageId'));
	}
});