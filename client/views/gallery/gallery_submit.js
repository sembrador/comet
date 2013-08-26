Template.gallerySubmit.events({
	'submit form': function(e, template) {
	    e.preventDefault();
	    var file = template.find('input[type=file]').files[0];
	    var reader = new FileReader();

	    //async callback, when finished reading file
	    //upload it to the db
	    reader.onload = function(e) {

	      var image = e.target.result;

	      Meteor.call('upload', image, function(error, id) {
	      	if (error) {
	      		throw new Meteor.Error(422, 'File not uploaded');
	      	}
	      	else 
	      		Meteor.Router.to('galleryEdit', id);
	      		throwSuccess('Image submitted successfully');
	      });
	    }
	    reader.readAsDataURL(file);
	  }
});

