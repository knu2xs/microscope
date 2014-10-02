Comments = new Meteor.Collection('comments');

Meteor.methods({
  comment: function(commentAttributes){
    var user = Meteor.user();
    var post = Posts.findOne(commentAttributes.postId);

    // VALIDATION
    // user is logged in
    if (!user) throw new Meteor.Error(401, 'Please log in to make comments.');

    // body is populated
    if (!commentAttributes.body){
      throw new Meteor.Error(422, 'Please write some content in your comment.');
    };

    // commenting on actual post
    if (!post) throw new Meteor.Error(422, 'You must comment on a post');

    // SUBMIT COMMENT
    // user underscore to extract only our fields, preventing malicious code
    var comment = _.extend(_.pick(commentAttributes, 'postId', 'body'), {
      userId: user._id,
      author: user.username,
      submitted: new Date().getTime()
    });

    // increment the comments count by one
    Posts.update(comment.postId, {$inc: {commentsCount: 1}});

    // create the comment and save the id
    comment._id = Comments.insert(comment);

    // create the notification to let the user know a comment has been added
    createCommentNotification(comment);

    // return the comment id
    return comment._id;
  }
});
