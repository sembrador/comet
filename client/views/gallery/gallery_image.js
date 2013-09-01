Template.galleryImage.helpers({
	upvotedClass: function() {
		var user = Meteor.user();
		if (user._id && !_.include(user.upvotes, this._id))
			return 'btn-primary upvotable';
		else
			return 'disabled';
	},

	downvoteClass: function() {
		var user = Meteor.user();
		if (user._id && !_.include(user.downvotes, this._id) && this.votes != 0)
			return 'btn-primary downvotable';
		else 
			return 'disabled';
	},
	submittedText: function() {
	    return new Date(this.submitted).ago;
	},

	ownsImage: function() {
		return this.userId == Meteor.userId();
	},

	currentPage: function() {
		if (Session.get('currentPage') == 'userImages')
			return true;
		else 
			return false;
	}
});

Template.galleryImage.events({
	'click .upvotable': function(e) {
		e.preventDefault();
		Meteor.call('upvote', this._id);
	},

	'click .downvotable': function(e) {
		e.preventDefault();
		Meteor.call('downvote', this._id);
	},

	'click .delete': function(e) {
		e.preventDefault();
		Images.remove(this._id);		
		throwSuccess('Awww, your image has been deleted. :(');
		Meteor.Router.to('/');
	}
});

Template.galleryImage.rendered = function(){
  // animate image from previous position to new position
  var instance = this;
  var rank = instance.data._rank;
  var $this = $(this.firstNode);
  var imageHeight = 80;
  var newPosition = rank * imageHeight;
  // if element has a currentPosition (i.e. it's not the first ever render)
  if (typeof(instance.currentPosition) !== 'undefined') {
    var previousPosition = instance.currentPosition;
    // calculate difference between old position and new position and send element there
    var delta = previousPosition - newPosition;
    $this.css("top", delta + "px");
  } else {
    // it's the first ever render, so hide element
    $this.addClass("invisible");
  }
  // let it draw in the old position, then..
  Meteor.defer(function() {
    instance.currentPosition = newPosition;
    // bring element back to its new original position
    $this.css("top",  "0px").removeClass("invisible");
  }); 
};
