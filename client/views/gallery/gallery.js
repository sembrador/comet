Template.gallery.helpers({
	gallery: function() {
    return Images.find({}, {sort: {submitted: -1}, limit: galleryHandle.limit()})
  },
  imagesReady: function() {
    return ! galleryHandle.loading();
  },
  allImagesLoaded: function() {
    return ! galleryHandle.loading() && 
      Images.find().count() < galleryHandle.loaded();
  }

});

Template.gallery.events({
  'click .load-more': function(e) {
    e.preventDefault();
    galleryHandle.loadNextPage();
  }
});