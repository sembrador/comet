Template.userFavorites.helpers({
	userFavorites: function() {
		user = Meteor.user();
		if (user.favorites)
			if (user.favorites.length > 1)
				return Images.find( { _id: { $in: user.favorites } } );
			else 
				return Images.find(user.favorites[0]);
		else {
				throwError("You don't have any favorites :(");
					return null;
			}
	}	
});