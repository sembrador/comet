Template.gallerySidebar.helpers({
	gallery: function() {
    return Images.find({}, {sort: {votes: -1, submitted: -1}, limit: 20});
  }
  // imagesReady: function() {
  //   return ! galleryHandle.loading();
  // },
  // allImagesLoaded: function() {
  //   return ! galleryHandle.loading() && 
  //     Images.find().count() < galleryHandle.loaded();
  // }

});

// Template.gallerySidebar.events({
//   'click .load-more': function(e) {
//     e.preventDefault();
//     galleryHandle.loadNextPage();
//   }
// });