// requires
Images = new Meteor.Collection('images');

Images.allow({
    update: ownsDocument,
    remove: ownsDocument
});

Images.deny({
    update: function(userId, image, fieldNames) {
        return (_.without(fieldNames, 'title', 'description').length > 0);
    }
});

Meteor.methods({
    upload: function(image) {
        var user = Meteor.user();

        var newImage = {
            title: '',
            description: '',
            submitted: new Date().getTime(),
            commentsCount: 0,
            votes: 0,
            url: image
        };

        if (user) {
            newImage["userId"] = user._id;
            newImage["author"] = user.username;
        }

        var imageId = Images.insert(newImage);
        return imageId;
    }
});
