Template.commentSubmit.events({
	'submit form': function(e, template) {
		e.preventDefault();

		var $body = $(e.target).find('[name=body]');
		var comment = {
			body: $body.val(),
			imageId: template.data._id,
			votes: 0
		};

		Meteor.call('comment', comment, function(error, comment) {
			if (error) {
				throwError(error.reason);
			}
			else {
				$body.val('');
				throwSuccess('Comment submitted successfully');
			}
		});
	}
});