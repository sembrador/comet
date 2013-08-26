Template.galleryEdit.helpers({
	image: function() {
		return Images.findOne(Session.get('currentImageId'));
	},

	ownsImage: function() {
		return this.userId == Meteor.userId();
	}
})

Template.galleryEdit.events({
	'submit form': function(e) {
		e.preventDefault();		

		var currentImageId = Session.get('currentImageId');

		var imageProperties = {
			title: $(e.target).find('[name=title]').val(),
			description: $(e.target).find('[name=description]').val()
		}

		if (!imageProperties.title) {
			throwError('Please enter a title');
			Meteor.Router.to('galleryPageEdit', currentImageId);
		}


		Images.update(currentImageId, {$set: imageProperties}, function(error, id) {
			if (error)
				throw new Meteor.Error(422, 'Image not updated');
			else 
				Meteor.Router.to('galleryPage', currentImageId);
		});
	}
});