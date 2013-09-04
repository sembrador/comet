Meteor.Router.add({
	'/': {
		to: 'bestImages',
		as: 'home',
		and: function() { Session.set('currentPage', "gallery"); }
		},
	'/best': 'bestImages',
	'/new': 'newImages',
	'/gallery/:_id': {
		to: 'galleryPage',
		and: function(id) {	Session.set('currentImageId', id);
							Session.set('commentsLimit', 15); 
			}
	},
	'/gallery/:_id/edit': {
		to: 'galleryEdit',
		and: function(id) { Session.set('currentImageId', id); }
	},
	'/upload': 'gallerySubmit',
	'/images': {
		to: 'userImages',
		and: function() { Session.set('currentPage', "userImages"); }
	},
	'/favorites': {
		to: 'userFavorites', 
		and: function() { Session.set('currentPage', "userFavorites"); }
	}
});

Meteor.Router.filters({
	'requireLogin': function(page) {
		if (Meteor.user())
			return page;
		else if (Meteor.loggingIn())
			return 'loading';
		else 
			return 'accessDenied';
	},
	'clearErrors': function(page) {
		clearErrors();
		return page;
	},
	'clearSuccess': function(page) {
		clearSuccess();
		return page;
	}
});

Meteor.Router.filter('requireLogin', {only: 'galleryEdit'});
Meteor.Router.filter('clearErrors');
Meteor.Router.filter('clearSuccess');

