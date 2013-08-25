Template.gallerySubmit.events({
	// "change .file-upload-input": function(event, template){
	//    var func = this;
	//    var file = event.currentTarget.files[0];
	//    var reader = new FileReader();
	//    reader.onload = function(fileLoadEvent) {
	//       Meteor.call('file-upload', file, reader.result);
	//    };
	//    reader.readAsBinaryString(file);
	// }
	'submit form': function(e, template) {
	    e.preventDefault();
	    var file = template.find('input[type=file]').files[0];
	    var reader = new FileReader();
	    reader.onload = function(e) {
	      // Add it to your model
	      // imageId = Images.insert({url: e.target.result });

	      // // Update an image on the page with the data
	      // Meteor.Router.to('galleryPage', imageId);
	      var image = e.target.result;

	      Meteor.call('upload', image, function(error, id) {
	      	if (error) {
	      		throw new Meteor.Error(422, 'File not uploaded');
	      	}
	      	else 
	      		Meteor.Router.to('galleryPage', id);
	      });
	    }
	    reader.readAsDataURL(file);
	  }

		// reader.onload = function () {
		// 	Meteor.call('upload', file.name, reader.result, function(error, id) {
		// 		if (error)
		// 			throw new Meteor.Error(422, 'File not uploaded to server');
		// 		else
		// 			Meteor.Router.to('galleryPage', id);
		// 	});
		// };

		// reader.onerror = function() {

		// };

		// reader.readAsBinaryString(file);


		// using a method because otherwise things would 
		// get too complicated. We instead do the insertion
		// via a standard async callback.
		// format Meteor.call('name of func', object, callback)
		// Meteor.call('upload', image, function(error, id) {
		// 	if (error) {
		// 		throw new Meteor.Error(422, 'Upload unsuccessful');
		// 	}
		// 	else {
		// 		Meteor.Router.to('galleryPage', id);
		// 	}
		// });
});

