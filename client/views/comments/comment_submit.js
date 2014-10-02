Template.commentSubmit.events({
  'submit form': function(event, template){
    // catch default behavior
    event.preventDefault();

    // use jQuery to collect values from form
    var $body = $(event.target).find('[name=body]');
    var comment = {
      body: $body.val(),
      postId: template.data._id
    };

    // submit comment and clear form
    Meteor.call('comment', comment, function(error, commentId){
      if (error) {
        throwError(error.reason);
      } else {
        $body.val('');
      }
    });
  }
});
