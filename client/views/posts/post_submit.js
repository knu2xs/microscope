Template.postSubmit.events({
    'submit form': function(e) {

        // catch the default submit event and intercept it
        e.preventDefault();

        // create a post json object using values from form
        var post = {
            url: $(e.target).find('[name=url]').val(),
            title: $(e.target).find('[name=title]').val(),
            message: $(e.target).find('[name=message]').val()
        };

        // submit the post to the database and view the newly submitted post
        post._id = Posts.insert(post);
        Router.go('postPage', post);
    }
});