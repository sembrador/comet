var imageUpload;
 
Template.gallerySubmit.events({
  'drop #image-upload-dropzone': function(e) {
    return new imageUpload(e);
  }
});
 
imageUpload = (function() {
  function imageUpload(e) {
    this.fileList = e.dataTransfer.files;
    this.uploadFile(this.fileList[0]);
  };
 
  imageUpload.prototype.uploadFile = function(file) {
    var reader, mimeType, type; 
    mimeType = file.type;
    type = mimeType.split('/');

    reader = new FileReader();
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
    };
    
    type[0] == 'image' ? reader.readAsDataURL(file): throwError('Well, this is awkward. You can only load imgaes.');
  }; 
  return imageUpload;
 
})();



// Template.gallerySubmit.events({
// 	'submit form': function(e, template) {
// 	    e.preventDefault();
// 	    var file = template.find('input[type=file]').files[0];
// 	    var reader = new FileReader();

// 	    var mimeType=file.type;
// 	    var type = mimeType.split("/"); 

// 	    //async callback, when finished reading file
// 	    //upload it to the db
// 	    reader.onload = function(e) {

// 	      var image = e.target.result;

// 	      Meteor.call('upload', image, function(error, id) {
// 	      	if (error) {
// 	      		throw new Meteor.Error(422, 'File not uploaded');
// 	      	}
// 	      	else 
// 	      		Meteor.Router.to('galleryEdit', id);
// 	      		throwSuccess('Image submitted successfully');
// 	      });
// 	    }

// 	    if (type[0] == 'image'){
// 	    	reader.readAsDataURL(file);
// 	    }
// 	    else
// 	    	throwError('Well, this is awkward. You can only load imgaes.')
	    
// 	  }
// });

