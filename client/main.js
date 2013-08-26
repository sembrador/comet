//subscriptions here
galleryHandle = Meteor.subscribeWithPagination('images', 3);

Deps.autorun(function() {
	Meteor.subscribe('currentImage', Session.get('currentImage'));
 	Meteor.subscribe('comments', Session.get('currentImageId'));
});

