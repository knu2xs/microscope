Template.postSubmit.events({
    'submit form': function(event) {

        // catch the default submit event and intercept it
        event.preventDefault();

        // create a post json object using values from form
        var post = {
            url: $(event.target).find('[name=url]').val(),
            title: $(event.target).find('[name=title]').val(),
            message: $(event.target).find('[name=message]').val()
        };

        // call the meteor method to create a new post
        Meteor.call('post', post, function(error, id){
            if (error) return alert(error.reason);
            Router.go('postPage', {_id: id});
        });
    }
});