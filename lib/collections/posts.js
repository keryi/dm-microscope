Posts = new Mongo.Collection('posts');

Posts.allow({
  update: function(userId, post) { return ownsDocument(userId, post); },
  remove: function(userId, post) { return ownsDocument(userId, post); },
});

Posts.deny({
  update: function(userId, post, fieldNames) {
    return (_.without(fieldNames, 'url', 'title').length > 0);
  }
})

Meteor.methods({
  postInsert: function(postAttributes) {
    check(Meteor.userId(), String);
    check(postAttributes, {
      title: String,
      url: String
    });

    if (Meteor.isServer) {
      postAttributes.title += '(Server)';
      Meteor._sleepForMs(5000);
    } else {
      postAttributes.title += '(Client)';
    }

    var postWithSameUrl = Posts.findOne({ url: postAttributes.url });
    if (postWithSameUrl) {
      return {
        postExists: true,
        _id: postWithSameUrl._id
      };
    }

    var user = Meteor.user();
    var post = _.extend(postAttributes, {
      userId: user._id,
      author: user.username,
      submittedAt: new Date()
    });

    var postId = Posts.insert(post);

    return {
      _id: postId
    };
  }
});
