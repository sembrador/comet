Template.gallerySidebar.helpers({
	gallery: function() {
    return Images.find({}, {sort: {votes: -1, submitted: -1}, limit: bestGalleryHandle.limit()});
  },

  imagesReady: function() {
    return bestGalleryHandle.ready();
  },

  allImagesLoaded: function() {
    return bestGalleryHandle.ready() &&
      Images.find().count() < bestGalleryHandle.loaded();
  }

});

Template.gallerySidebar.events({
  'click .load-more-sidebar': function(e) {
    e.preventDefault();
    bestGalleryHandle.loadNextPage();
  }
});