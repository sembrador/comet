Template.successes.helpers({
  successes: function() {
    return Successes.find();
  }
});

Template.success.rendered = function() {
  var success = this.data;
  Meteor.defer(function() {
    Successes.update(success._id, {$set: {seen: true}});
  });
};