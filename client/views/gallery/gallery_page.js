Template.galleryPage.helpers({
	currentImage: function() {
		return Images.findOne(Session.get('currentImageId'));
	},

	commentsWithRank: function() {
		var i = 0, options = {sort: {votes: -1, submitted:-1}};
		return Comments.find({imageId: this._id}, options).map(function(comment) {
			comment._rank = i;
			i += 1;
			return comment;
		});
	},

  submittedText: function() {
      return new Date(this.submitted).ago;
  }
});

Template.galleryPage.rendered = function(){
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