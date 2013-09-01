Template.comment.helpers({
	submittedText: function() {
		return new Date(this.submitted).toString();
	},

	upvoteClass: function() {
		var user = Meteor.user();
		if (user._id && !_.include(user.upvotes, this._id))
			return 'btn-primary upvotable';
		else
			return 'disabled';
	},

	downvoteClass: function() {
		var user = Meteor.user();
		if (user._id && !_.include(user.downvotes, this._id) && this.votes !=0)
			return 'btn-primary downvotable';
		else 
			return 'disabled';
	},

	submittedText: function() {
	    return new Date(this.submitted).ago;
  }
});

Template.comment.events({
	'click .upvotable': function(e) {
		e.preventDefault();
		Meteor.call('upvoteComment', this._id, function(error) {
			if (error)
				throwError(error.reason);
		});
	},

	'click .downvotable': function(e) {
		e.preventDefault();
		Meteor.call('downvoteComment', this._id);
	}
});

Template.comment.rendered = function() {
	// animate comment from previous position to new position
  var instance = this;
  var rank = instance.data._rank;
  var $this = $(this.firstNode);
  var commentHeight = 80;
  var newPosition = rank * commentHeight;
  // if element has a currentPosition (i.e. it's not the first ever render)
  if (typeof(instance.currentPosition) !== 'undefined') {
    var previousPosition = instance.currentPosition;
    // calculate difference between old position and new position and send element there
    var delta = previousPosition - newPosition;
    $this.css("top", delta + "px");
  }
  // let it draw in the old position, then..
  Meteor.defer(function() {
    instance.currentPosition = newPosition;
    // bring element back to its new original position
    $this.css("top",  "0px");
  }); 

};