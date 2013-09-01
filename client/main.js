//subscriptions here
newGalleryHandle = Meteor.subscribeWithPagination('newImages', 16);
bestGalleryHandle = Meteor.subscribeWithPagination('bestImages', 16);

Deps.autorun(function() {
	Meteor.subscribe('currentImage', Session.get('currentImageId'));
 	Meteor.subscribe('comments', Session.get('currentImageId'));
});

