Template.postsList.helpers({
  posts: function() {
    return Posts.find({} , { sort: { submittedAt: -1 } });
  }
});

Meteor.startup(function() {
  Tracker.autorun(function() {
    console.log('There are ' + Posts.find().count() + ' posts');
  });
});