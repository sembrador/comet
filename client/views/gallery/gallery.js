Template.bestImages.helpers({
  options: function() {
    return {
      sort: {votes: -1, submitted: -1},
      galleryHandle: bestGalleryHandle
    };
  }
});

Template.newImages.helpers({
  options: function() {
    return {
      sort: {submitted: -1},
      galleryHandle: newGalleryHandle
    };
  }
});

Template.gallery.helpers({
  imagesWithRank: function() {
    var i = 0, options = {sort: this.sort, limit: this.galleryHandle.limit()};
    return Images.find({}, options).map(function(image) {
      image._rank = i;
      i += 1;
      return image;
    });
  },

  imagesReady: function() {
    return this.galleryHandle.ready();
  },

  allImagesLoaded: function() {
    return this.galleryHandle.ready() &&
      Images.find().count() < this.galleryHandle.loaded();
  },

  activeRouteClass: function(/* route names */) {

    var args = Array.prototype.slice.call(arguments, 0);
    args.pop();    

    var active = _.any(args, function(name) {
      return location.pathname === Meteor.Router[name + 'Path']();
    });

    return active && 'active';
  }
});

Template.gallery.events({
  'click .load-more': function(e) {
    e.preventDefault();
    this.galleryHandle.loadNextPage();
  }
});