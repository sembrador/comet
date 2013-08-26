Successes = new Meteor.Collection(null);

throwSuccess = function(message) {
	Successes.insert({message: message, seen: false});
}

clearSuccess = function() {
	Successes.remove({seen: true});
}