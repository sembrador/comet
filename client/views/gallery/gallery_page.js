Template.galleryPage.helpers({
	currentImage: function() {
		return Images.findOne(Session.get('currentImageId'));
	},

	commentsWithRank: function(limit) {
		var i = 0, options = {sort: {votes: -1, submitted:-1}, limit: Session.get('commentsLimit')};
		return Comments.find({imageId: this._id}, options).map(function(comment) {
			comment._rank = i;
			i += 1;
			return comment;
		});
	},

  upvoteClass: function() {
    var user = Meteor.user();
    if (user)
      if (user._id && !_.include(user.upvotes, this._id))
        return 'btn-primary upvotable';
      else
        return 'disabled';
    else {
      return 'disabled';
    }
  },

  downvoteClass: function() {
    var user = Meteor.user();
    if (user)
      if (user._id && !_.include(user.downvotes, this._id) && this.votes != 0)
        return 'btn-primary downvotable';
      else 
        return 'disabled';
    else {
      return 'disabled';
    }
  },

  favoriteClass: function() {
    var user = Meteor.user();
    if (user)
      if (user._id && !_.include(user.favorites, this._id))
        return 'btn-primary favorite';
      else 
        return 'disabled';
    else {
      return 'disabled';
    }
  },

  submittedText: function() {
      return new Date(this.submitted).ago;
  },

  titleAdjusted: function(title) {
    if (title.length >= 20)
      return 'small';
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


Template.galleryPage.events({
  'click .upvotable': function(e) {
    e.preventDefault();
    Meteor.call('upvote', this._id);
  },

  'click .downvotable': function(e) {
    e.preventDefault();
    Meteor.call('downvote', this._id);
  },

  'click .favorite': function(e) {
    e.preventDefault();
    Meteor.call('favorite', this._id);
  },

  'click .load-more': function(e) {
    e.preventDefault();
    Session.set('commentsLimit', 10);
  },

  'click .random': function(e) {
    var imgs = Images.find({}, {sort: {votes: -1, submitted: -1}, limit: bestGalleryHandle.limit()});
    var imgArray = imgs.fetch();
    randomImage = Random.choice(imgArray);
    Meteor.Router.to('galleryPage', randomImage._id);
  }
});