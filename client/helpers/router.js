Meteor.Router.add({
	'/': 'gallery',
	'/gallery/:_id': {
		to: 'galleryPage',
		and: function(id) {	Session.set('currentImageId', id); }
	},
	'/gallery/:_id/edit': {
		to: 'galleryEdit',
		and: function(id) { Session.set('currentImageId', id)}
	},
	'/upload': 'gallerySubmit'
});

