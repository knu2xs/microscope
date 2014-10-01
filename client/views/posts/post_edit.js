Template.postEdit.events({
    'submit form': function(event){
        // catch default submit event
        event.preventDefault();

        // get the current post id
        var currentPostId = this._id;

        // get properties from form
        var postProperties = {
            url: $(event.target).find('[name=url]').val(),
            title: $(event.target).find('[name=title').val()
        };

        // update record using properties collected from form and redirect to updated post
        Posts.update(currentPostId, {$set:postProperties}, function(error){
            if (error) {
                alert(error.reason)
            } else {
                Router.go('postPage', {_id: currentPostId});
            }
        })
    },

    // delete the current post
    'click .delete': function(event){
        // catch the default link event
        event.preventDefault();

        // check for confirmation
        if (confirm('Delete this post?')) {
            var currentPostId = this._id;
            Posts.remove(currentPostId);
            Router.go('postsList');
        }
    }
});