Posts = new Meteor.Collection('posts');

Posts.allow({
    update: ownsDocument,
    remove: ownsDocument
});

Posts.deny({
    // this protects from malicious extra fields being submitted
    update: function(userId, post, fieldNames){
        return (_.without(fieldNames, 'url', 'title').length > 0);
    }
});

Meteor.methods({
    post: function(postAttributes){
        var user = Meteor.user(),
            postWithSameLink = Posts.findOne({url: postAttributes.url});

        // VALIDATIONS
        // user logged in
        if (!user) throw new Meteor.Error(401, 'Please log in to post a new story.');

        // post title present
        if (!postAttributes.title) throw Meteor.Error(422, 'Please provide a headline or title.');

        // url present
        if (!postAttributes.url) throw Meteor.Error(422, 'Please provide a url.');

        // duplicate url
        if (postAttributes.url && postWithSameLink){
            throw new Meteor.Error(303, 'This link has already been submitted.', postWithSameLink._id);
        }

        // PROCESS SUBMISSION
        // use underscore to extract specific keys, thereby protecting against extra keys with malicious code
        var post = _.extend(_.pick(postAttributes, 'url', 'title', 'message'), {
            userId: user._id,
            author: user.username,
            submitted: new Date().getTime(),
            commentsCount: 0
        });

        var postId = Posts.insert(post);

        return postId;
    }
});
