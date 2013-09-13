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
            views: 0,
            url: image
        };

        if (user) {
            newImage["userId"] = user._id;
            newImage["author"] = user.username;
        }

        var imageId = Images.insert(newImage);
        return imageId;
    },
    
    upvote: function(imageId) {
        var user = Meteor.user();

        if (!user)
            throw new Meteor.Error(401, 'You need to login to upvote');
        var image = Images.findOne(imageId);
        if (!image)
            throw new Meteor.Error(422, 'Image not found');
        if (_.include(user.upvotes, image._id))
            throw new Meteor.Error(422, 'Alreader upvoted this');

        Images.update({
            _id: imageId,
            }, {
                $inc: {votes: 1}
            });

        Meteor.users.update({
          _id: user._id, 
          upvotes: {$ne: imageId}
        }, {
          $addToSet: {upvotes: imageId},
          $pull: {downvotes: imageId}
        });
    },

    downvote: function(imageId) {
        var user = Meteor.user();

        if (!user)
            throw new Meteor.Error(401, 'You need to login to upvote');
        var image = Images.findOne(imageId);
        if (!image)
            throw new Meteor.Error(422, 'Image not found');
        if (_.include(user.downvotes, imageId))
            throw new Meteor.Error(422, 'Alreader downvoted this');
        if (image.votes == 0)
            throw new Meteor.Error(422, 'Votes cannot be negative');

        Images.update({
            _id: imageId,
            }, {
            $inc: {votes: -1}
        });

        Meteor.users.update({
          _id: user._id, 
          downvotes: {$ne: imageId}
        }, {
          $addToSet: {downvotes: imageId},
          $pull: {upvotes: imageId}
        });
    },

    favorite: function(imageId) {
        var user = Meteor.user();

        if (!user)
            throw new Meteor.Error(401, 'You need to login to favorite');
        var image = Images.findOne(imageId);
        if (!image)
            throw new Meteor.Error(422, 'Image not found');
        if (_.include(user.downvotes, imageId))
            throw new Meteor.Error(422, 'Alreader favorited this');

        Images.update({
            _id: imageId,
            }, {
            $inc: {favorites: 1}
        });

        Meteor.users.update({
          _id: user._id, 
          favorites: {$ne: imageId}
        }, {
          $addToSet: {favorites: imageId},
        });
    },

    views: function(imageId) {
        Images.update({
            _id: imageId,
            }, {
            $inc: {views: 1}
        });
    }
}); 
